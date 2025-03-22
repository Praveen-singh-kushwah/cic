import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const Results = () => {
  const classificationResults = useSelector(
    (state) => state.result.classificationResults
  );
  const tableRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Initialize DataTables
  useEffect(() => {
    if (classificationResults?.length > 0 && tableRef.current) {
      // Initialize or reinitialize DataTable
      const dataTable = $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        ordering: true,
        info: true,
        responsive: true,
        pageLength: 5,
        destroy: true,
        scrollCollapse: false,
        // Explicitly disable scrolling
        scrollY: false,
        scrollX: false,
        columnDefs: [
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 1 }
        ],
        language: {
          search: "Search:",
          lengthMenu: windowWidth < 640 ? "_MENU_" : "Show _MENU_ entries",
          info: windowWidth < 640 ? "_START_-_END_ of _TOTAL_" : "Showing _START_ to _END_ of _TOTAL_ entries"
        },
        // Modified dom to control layout with more specific container classes
        dom: '<"top grid grid-cols-2 gap-4 mb-4"<"col-span-1 flex items-center"l><"col-span-1 flex justify-end"f>>rt<"bottom grid grid-cols-2 gap-4 mt-4"<"col-span-1 flex items-center"i><"col-span-1 flex justify-end"p>>'
      });

      // Apply additional styling to fix overlapping
      $('.dataTables_info, .dataTables_paginate').css({
        'float': 'none',
        'clear': 'none'
      });

      $('.dataTables_wrapper .bottom').css({
        'display': 'flex',
        'justify-content': 'space-between',
        'align-items': 'center',
        'margin-top': '1rem'
      });

      // Apply custom CSS to prevent scrollbars
      $('.dataTables_wrapper').css({
        'overflow': 'visible',
        'max-height': 'none'
      });

      // Ensure pagination is properly aligned
      $('.dataTables_paginate').css({
        'text-align': 'right'
      });

      // Cleanup
      return () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          dataTable.destroy();
        }
      };
    }
  }, [classificationResults, windowWidth]);

  if (!classificationResults || classificationResults.length === 0) {
    return (
      <div className="h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 font-serif">
            No Results Available
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg font-medium font-sans">
            Please upload a dataset to view classification results.
          </p>
        </div>
      </div>
    );
  }

  // Process data for pie chart
  const frequencyMap = {};
  classificationResults.forEach((item) => {
    const intent = item.predictedIntent || "Unknown";
    frequencyMap[intent] = (frequencyMap[intent] || 0) + 1;
  });

  const pieData = Object.keys(frequencyMap).map((intent) => ({
    name: intent,
    value: frequencyMap[intent],
  }));

  // Get appropriate chart dimensions based on screen size
  const getPieChartDimensions = () => {
    if (windowWidth < 640) {
      return { height: 200, outerRadius: 70 };  // Optimized for mobile
    } else if (windowWidth < 1024) {
      return { height: 300, outerRadius: 100 };
    }
    return { height: 340, outerRadius: 120 };
  };

  const { height, outerRadius } = getPieChartDimensions();
  const isMobile = windowWidth < 1024;
  
  // Create custom legend component for better control in mobile view
  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap justify-center mt-2 gap-3">
        {pieData.map((entry, index) => (
          <div key={`legend-item-${index}`} className="flex items-center mr-3 mb-1">
            <div
              style={{
                width: '12px',
                height: '12px',
                backgroundColor: COLORS[index % COLORS.length],
                marginRight: '4px',
                borderRadius: '2px'
              }}
            />
            <span style={{ fontSize: '10px' }}>{entry.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Custom tooltip formatter that displays intent name instead of "Count"
  const customTooltipFormatter = (value, name, entry) => {
    // Use the actual intent name from the data point
    return [`${value} queries`, entry.payload.name];
  };

  return (
    <div className="min-h-screen bg-gray-100 py-4 px-2">
      <div className="bg-white rounded-lg shadow-lg p-3 md:p-6 w-full max-w-screen-xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
          Classification Results
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Pie Chart Section - Will be first on mobile, second on desktop */}
          <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-4 flex flex-col items-center`}>
            <h3 className="text-lg font-bold mb-2 text-center">
              Intent Distribution
            </h3>
            
            <div className="w-full">
              <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={outerRadius}
                    fill="#8884d8"
                    dataKey="value"
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={customTooltipFormatter} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Custom legend outside the chart container */}
              <CustomLegend />
            </div>
          </div>

          {/* Table Section - Will be second on mobile, first on desktop */}
          <div className={`${isMobile ? 'order-2 mt-4' : 'order-1'} lg:col-span-8`}>
            <h3 className="text-lg font-bold mb-2 text-center">
              Detailed Results
            </h3>
            <div className="border p-2 border-gray-300 rounded-lg overflow-hidden">
              <div className="datatable-container">
                <table
                  ref={tableRef}
                  className="display dataTable w-full"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr>
                      <th>Query</th>
                      <th>Predicted Intent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classificationResults.map((item, index) => (
                      <tr key={index}>
                        <td className="break-words">{item.text}</td>
                        <td>{item.predictedIntent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;