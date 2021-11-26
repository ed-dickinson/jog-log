
const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
const monthsAbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const modern = (rawDateInput) => {

    const rawDateObj = new Date(rawDateInput);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth()+1, day: rawDateObj.getDate()}

    const formattedDate = rawDate.year + '-' + (rawDate.month.toString().length>1?'':'0')  + rawDate.month + '-' + (rawDate.day.toString().length>1?'':'0') + rawDate.day;

    return formattedDate;

}

const traditional = (rawDateInput) => {

    const rawDateObj = new Date(rawDateInput);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${rawDate.day}${dayth} of ${months[rawDate.month]} '${rawDate.year.toString().slice(2)}`;

    return formattedDate;

}

const traditionalShort = (rawDateInput) => {

    const rawDateObj = new Date(rawDateInput);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${rawDate.day}${dayth} ${monthsAbr[rawDate.month]} '${rawDate.year.toString().slice(2)}`;

    return formattedDate;

}

const tradCondensed = (rawDateInput) => {

    const rawDateObj = new Date(rawDateInput);
    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${months[rawDate.month]} ${rawDate.day}${dayth},  ${rawDate.year.toString().slice(0)}`;

    return formattedDate;
}

const tradShortNoYear = (rawDateInput) => {

    const rawDateObj = new Date(rawDateInput);
    
    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${rawDate.day}${dayth} ${monthsAbr[rawDate.month]}`;

    return formattedDate;

}

const dayAndDate = (rawDateInput) => {

  const rawDateObj = new Date(rawDateInput);

  const rawDate = {day: rawDateObj.getDay(), date: rawDateObj.getDate()}

  const dayth = [1||11||21||31].some(x=>x===rawDate.date) ? 'st' : [2||12||22].some(x=>x===rawDate.date) ? 'nd' : 'th';

  const formattedDate = `${day_names[rawDate.day]} ${rawDate.date}${dayth}`

  return formattedDate;
}

const exported = { traditional, traditionalShort, tradCondensed, tradShortNoYear, modern, dayAndDate }

export default exported
