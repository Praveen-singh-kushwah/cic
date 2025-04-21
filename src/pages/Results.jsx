import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

const Results = () => {
  const classificationResults = useSelector((state) => state.result.classificationResults);
  const tableRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isChatOpen, setIsChatOpen] = useState(false); // State for chat modal visibility

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
        scrollY: false,
        scrollX: false,
        columnDefs: [
          { responsivePriority: 1, targets: 0 },
          { responsivePriority: 2, targets: 1 },
        ],
        language: {
          search: "Search:",
          lengthMenu: windowWidth < 640 ? "_MENU_" : "Show _MENU_ entries",
          info: windowWidth < 640 ? "_START_-_END_ of _TOTAL_" : "Showing _START_ to _END_ of _TOTAL_ entries",
        },
        dom: '<"top grid grid-cols-2 gap-4 mb-4"<"col-span-1 flex items-center"l><"col-span-1 flex justify-end"f>>rt<"bottom grid grid-cols-2 gap-4 mt-4"<"col-span-1 flex items-center"i><"col-span-1 flex justify-end"p>>',
      });

      return () => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
          dataTable.destroy();
        }
      };
    }
  }, [classificationResults, windowWidth]);

  // Toggle chat modal
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

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
      return { height: 200, outerRadius: 70 };
    } else if (windowWidth < 1024) {
      return { height: 300, outerRadius: 100 };
    }
    return { height: 340, outerRadius: 120 };
  };

  const { height, outerRadius } = getPieChartDimensions();
  const isMobile = windowWidth < 1024;

  // Function to download classification results as CSV
  const downloadCSV = () => {
    if (!classificationResults || classificationResults.length === 0) {
      return;
    }

    // Create CSV content
    const csvHeader = "Query,Predicted Intent\n";
    const csvContent = classificationResults
      .map((item) => `"${item.text.replace(/"/g, '""')}","${item.predictedIntent}"`)
      .join('\n');

    const csvData = csvHeader + csvContent;

    // Create download link
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'classification_results.csv');
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Chat component for real-time prediction
  const RealTimePrediction = () => {
    return (
      <div>
        <h1>Real-time Prediction</h1>

        {/* Floating Chat Button */}
        <button
          onClick={toggleChat}
          className="fixed z-50 p-3 text-white transition duration-300 bg-blue-600 rounded-full shadow-lg bottom-6 right-6 hover:bg-blue-700"
        >
          💬 Chat Here
        </button>

        {/* Chat Modal */}
        {isChatOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-[90%] md:w-[600px] h-[80%] relative p-2">
              <button
                onClick={toggleChat}
                className="absolute text-xl text-gray-600 top-2 right-3 hover:text-red-600"
              >
                ✖
              </button>
              <iframe
                src="http://localhost:8501" // Make sure this matches your Streamlit port
                title="Intent Chatbot"
                width="100%"
                height="100%"
                style={{ border: "none", borderRadius: "8px" }}
              ></iframe>
            </div>
          </div>
        )}
      </div>
    );
  };

  if (!classificationResults || classificationResults.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen p-4 bg-gray-100">
        <div className="max-w-md mx-auto text-center">
          <h1 className="mb-3 font-serif text-2xl font-extrabold sm:text-3xl md:text-4xl sm:mb-4">
            No Results Available
          </h1>
          <p className="font-sans text-sm font-medium text-gray-700 sm:text-base md:text-lg">
            Please upload a dataset to view classification results.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-2 py-4 bg-gray-100">
      <div className="w-full max-w-screen-xl p-3 mx-auto bg-white rounded-lg shadow-lg md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold sm:text-2xl">Classification Results</h2>
          <button
            onClick={downloadCSV}
            className="flex items-center px-4 py-2 text-sm font-medium text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download CSV
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Pie Chart Section */}
          <div className={`${isMobile ? 'order-1' : 'order-2'} lg:col-span-4 flex flex-col items-center`}>
            <h3 className="mb-2 text-lg font-bold text-center">Intent Distribution</h3>
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
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Table Section */}
          <div className={`${isMobile ? 'order-2 mt-4' : 'order-1'} lg:col-span-8`}>
            <h3 className="mb-2 text-lg font-bold text-center">Detailed Results</h3>
            <div className="p-2 overflow-hidden border border-gray-300 rounded-lg">
              <div className="datatable-container">
                <table ref={tableRef} className="w-full display dataTable">
                  <thead>
                    <tr>
                      <th>Query</th>
                      <th>Predicted Intent</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classificationResults.map((item, index) => (
                      <tr key={index}>
                        <td>{item.text}</td>
                        <td>{item.predictedIntent}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <RealTimePrediction />
      </div>
    </div>
  );
};

export default Results;
