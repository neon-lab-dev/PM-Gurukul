/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICONS } from "../../assets";
import { useState } from "react";
import * as XLSX from "xlsx";

// Define the type for the header props
interface Header {
  key: string;
  label: string;
  sortable?: boolean;
}

interface RowData {
  [key: string]: string | number | any;
}

// Table component with typed props
interface TableProps {
  headers: Header[];
  data: RowData[];
  showHeader: boolean;
  pageName: string;
}

export const Table = ({
  headers = [],
  data = [],
  showHeader = true,
  pageName,
}: TableProps) => {
  const [openDropdownId, setOpenDropdownId] = useState<number | string | null>(
    null
  );

  const toggleDropdown = (id: number | string) => {
    setOpenDropdownId((prevId) => (prevId === id ? null : id));
  };

  const rowsPerPage = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
  const [displayData, setDisplayData] = useState<RowData[]>(data);

  const totalPages = Math.ceil(displayData.length / rowsPerPage);

  const currentData = displayData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleExport = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    const exportData = displayData.map((row, _) => {
      const exportRow: any = {};

      headers.forEach((header) => {
        // Skip the action column
        if (header.key === "action") {
          return;
        }

        const value = row[header.key];

        if (typeof value === "string" && value.includes("₹")) {
          // Value is already in the correct format for Excel
        }

        exportRow[header.label] = value || "";
      });

      return exportRow;
    });

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, pageName);
    XLSX.writeFile(wb, `${pageName}_Report_${currentDate}.xlsx`);
  };

  // Handle sorting by any sortable column
  const handleSort = (key: string) => {
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[key];
      const valueB = b[key];
      if (isSortedAsc) {
        return valueA < valueB ? -1 : 1;
      }
      return valueA > valueB ? -1 : 1;
    });
    setDisplayData(sortedData);
    setIsSortedAsc(!isSortedAsc);
    setCurrentPage(1);
  };

  // Conditional class for kycStatus column
  const getKycStatusColor = (status: string | number) => {
    if (status === "Pending") {
      return "bg-yellow-400 bg-opacity-30 text-yellow-700 px-2 py-1 rounded";
    }
    if (status === "Rejected") {
      return "bg-red-100  text-red-700 px-2 py-1 rounded";
    }
    if (status === "Approved" || status === "Active" || status === "Paid") {
      return "bg-green-100 text-green-700 px-2 rounded";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto">
      <div className="bg-white min-h-[250px] rounded-xl flex flex-col border border-neutral-55">
        {showHeader && (
          <div className="flex p-[10px] justify-between items-center">
            <div className="border flex gap-2 border-neutral-55 rounded-xl p-2 max-w-[190px]">
              <img src={ICONS.search} alt="Search Icon" />
              <input
                name="search"
                placeholder="Search"
                className="max-w-[140px]"
              />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <div className="flex justify-between items-center p-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-1 py-2 rounded ${
                    currentPage === 1
                      ? "text-neutral-10 cursor-not-allowed"
                      : "text-neutral-30"
                  }`}
                >
                  <img src={ICONS.AltArrowLeft} alt="Previous Page" />
                </button>
                <span className="text-neutral-10">
                  {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-1 py-2 rounded ${
                    currentPage === totalPages
                      ? "text-neutral-15 cursor-not-allowed"
                      : "text-neutral-30"
                  }`}
                >
                  <img src={ICONS.AltArrowRight} alt="Next Page" />
                </button>
              </div>
              <div className="flex bg-neutral-60 p-2 rounded-lg">
                <button onClick={handleExport}>Export</button>
              </div>
            </div>
          </div>
        )}
        <table className="table-auto w-full rounded-b-xl border-none text-left">
          <thead>
            <tr className="bg-neutral-60">
              {headers.map((header) => (
                <th
                  key={header.key}
                  className="px-4 py-2 font-Inter text-neutral-90 text-sm"
                  onClick={
                    header.sortable ? () => handleSort(header.key) : undefined
                  }
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td
                    key={header.key}
                    className="px-4 py-2 font-Inter border-b"
                  >
                    <span
                      className={`${
                        header.key == "kycStatus" ||
                        header.key == "status" ||
                        header.key === "payoutStatus" ||
                        header.key === "paymentStatus"
                          ? getKycStatusColor(row[header.key])
                          : ""
                      }
                      `}
                    >
                      {header.key === "action" ? (
                        row[header.key] && row[header.key].length > 0 ? (
                          <div className="relative">
                            {/* Menu button */}
                            <button
                              className="mx-auto"
                              onClick={() => toggleDropdown(index)}
                            >
                              <img
                                src={ICONS.menuDots}
                                className="w-5 h-5"
                                alt="Actions"
                              />
                            </button>

                            {/* Dropdown menu */}
                            {openDropdownId === index && (
                              <div
                                className="absolute top-8 right-0 z-10 bg-white shadow-md border rounded-md w-44"
                                // optional: use onMouseLeave or blur logic elsewhere to close
                              >
                                {row[header.key].map(
                                  (
                                    action: {
                                      label: string;
                                      onClick: () => void;
                                    },
                                    idx: number
                                  ) => (
                                    <button
                                      key={idx}
                                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-neutral-900"
                                      onClick={() => {
                                        action.onClick();
                                        setOpenDropdownId(null); // close after click
                                      }}
                                    >
                                      {action.label}
                                    </button>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        ) : null
                      ) : (
                        row[header.key]
                      )}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// TransactionHistory component to encapsulate Table
interface TransactionHistoryProps {
  data: RowData[];
  headers: Header[];
  showHeader: boolean;
}

const TransactionHistory = ({
  data = [],
  headers = [],
  showHeader = true,
}: TransactionHistoryProps) => {
  return (
    <Table
      data={data}
      headers={headers}
      showHeader={showHeader}
      pageName="Transaction History"
    />
  );
};

export default TransactionHistory;
