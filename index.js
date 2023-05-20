export default function solution(content) {
  // BEGIN
  console.log(content)
  // END
  const makeDataRow = (arr) => {
    return arr.map((element) => {
      const name = element[1].trim().charAt(0).toUpperCase() + element[1].trim().slice(1);
      const place = element[2].split(',').map((el) => el.trim().toLowerCase());
      const type = element[3].trim();

      let lifeTimeDays=0;
      if(element[4].includes('лет') || element[4].includes('год')){
        //Years
        if(element[4].includes('-')){
          const values =  element[4].trim().replace('-', ' ').split(' ');
          lifeTimeDays=(Number(values[0].trim())*365+Number(values[1].trim())*365)/2;
        }else{
          const values =  element[4].trim().split(' ');
          lifeTimeDays=Number(values[0].trim())*365;
        }
      }else{
        //Days
        if(element[4].includes('-')){
          const values =  element[4].trim().replace('-', ' ').split(' ');
          lifeTimeDays=(Number(values[0].trim())+Number(values[1].trim()))/2;
        }else{
          const values =  element[4].trim().split(' ');
          lifeTimeDays=Number(values[0].trim());
        }
      }

      let danger = false;
      if(element[5].trim()=='Да'){ danger = true; }
      
      return {
        name,
        place,
        type,
        lifeTimeDays,
        danger
      }
    })
  }
  
  const makeDataArray = (data) => {
    const parts = data.split('\n').slice(2).map((element) => {// will split rows by 'enter' and remove 2 first rows (captions);
       return element.split('|'); // will split row by '|'
    })
   
    return makeDataRow(parts);
  };
  
  const data = makeDataArray(content);
  //console.log(data);
 
  console.log(`Количество растений: ${data.length}`);

  console.log(`Список растений в алфавитном порядке: ${data.map((plant) => plant.name).sort((a, b) => a.localeCompare(b)).join(', ')}`);
  
  const dangerPlants = data.filter(o => o.danger == true);

  console.log(`Количество опасных растений: ${dangerPlants.length}, количество безопасных растений: ${data.length-dangerPlants.length}, процентное соотношение: ${dangerPlants.length / (data.length-dangerPlants.length) *100} %`);

  const forestPlants = data.filter((o) => o.place.filter(d => d.includes('леса')).length>0);

  let sumOfLifeTimeDays = 0;
  forestPlants.forEach((plant) => {
    sumOfLifeTimeDays += plant.lifeTimeDays;
  })
  console.log(`Среднее время жизни всех лесных растений: ${sumOfLifeTimeDays/forestPlants.length} дней, или примерно ${sumOfLifeTimeDays/forestPlants.length/365} лет`);

  const allPlacesOfDangerPlants = dangerPlants.map((plant) => plant.place).flat();
  const dangerPlaces = allPlacesOfDangerPlants.reduce(function(acc, i) {
    acc[i] = (acc[i] || 0) + 1;
    return acc;
  }, {});
  const mostDangerPlace = Object.keys(dangerPlaces).reduce((a, b) => dangerPlaces[a] > dangerPlaces[b] ? a : b);

  console.log(`Место обитания, больше всего свойственное опасным для человека растениям: ${mostDangerPlace}`);


}