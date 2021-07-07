

const getAvailableTickects = (dataRaffle = [], dataTickects = []) => {

  const tickectsUnAvailable = parseDate(dataTickects);
 
  const list = dataRaffle.map(a => {
    const match = tickectsUnAvailable.find(i => i.value === a.value);
    return !match ? a : null;
  });
  const listParse = list.filter(a => a);

  return listParse;
}


const parseDate = (data = []) => {
  const dataTickect = [];
  data.forEach(e => {
    dataTickect.push(e.tickects)
  });
  const allTickects = dataTickect.flat();
  return allTickects;
}

module.exports = { getAvailableTickects }
