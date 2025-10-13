export function formatDate(dateInput?: string | Date | null): string {
  if (!dateInput) return "N/A";

  const date = dateInput instanceof Date ? dateInput : new Date(dateInput);

  if (isNaN(date.getTime())) {
    console.error("Invalid date:", dateInput);
    return "Invalid Date";
  }

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  const getOrdinalSuffix = (day: number): string => {
    if (day % 10 === 1 && day % 100 !== 11) return "st";
    if (day % 10 === 2 && day % 100 !== 12) return "nd";
    if (day % 10 === 3 && day % 100 !== 13) return "rd";
    return "th";
  };

  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month}, ${year}`;
}