
const modern = (rawDateInput) => {
  // runs.forEach(run => {
    const rawDateObj = new Date(rawDateInput);
    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth()+1, day: rawDateObj.getDate()}
    const formattedDate = rawDate.year + '-' + (rawDate.month.toString().length>1?'':'0')  + rawDate.month + '-' + (rawDate.day.toString().length>1?'':'0') + rawDate.day;
    return formattedDate;
  // })
}

const traditional = (rawDateInput) => {
    const months = ["January","February","March","April","May","June","July",
          "August","September","October","November","December"];

  // runs.forEach(run => {
    const rawDateObj = new Date(rawDateInput);
    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    // const two_digit_year = rawDate.year.slice(2);

    const dayth = rawDate.day === '1'||'11'||'21'||'31' ? 'st' : rawDate.day === '2'||'12'||'22' ? 'nd' : 'th';

    // const month = (rawDate.month.toString().length>1?'':'0')  + rawDate.month + '-' + (rawDate.day.toString().length>1?'':'0');
    const formattedDate = `${rawDate.day}${dayth} of ${months[rawDate.month]} '${rawDate.year.toString().slice(2)}`;
    return formattedDate;
  // })
}

const traditionalShort = (rawDateInput) => {

    const monthsAbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
  // runs.forEach(run => {
    const rawDateObj = new Date(rawDateInput);
    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    // const two_digit_year = rawDate.year.slice(2);

    const dayth = rawDate.day === '1'||'11'||'21'||'31' ? 'st' : rawDate.day === '2'||'12'||'22' ? 'nd' : 'th';

    // const month = (rawDate.month.toString().length>1?'':'0')  + rawDate.month + '-' + (rawDate.day.toString().length>1?'':'0');
    const formattedDate = `${rawDate.day}${dayth} ${monthsAbr[rawDate.month]} '${rawDate.year.toString().slice(2)}`;
    return formattedDate;
  // })
}

export default { traditional, traditionalShort, modern }
