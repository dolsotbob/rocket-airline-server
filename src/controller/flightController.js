const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: (req, res) => {
    // console.log(req);
    // TODO:
    try {
      const { departure_times, arrival_times, destination, departure } = req.query;

      const filtered = flights.filter((flight) => {
        return (!departure || flight.departure === departure) &&
          (!destination || flight.destination === destination) &&
          (!departure_times || flight.departure_times === departure_times) &&
          (!arrival_times || flight.arrival_times === arrival_times);
      });

      return res.status(200).json(filtered);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  },
  // [GET] /flight/:id
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    try {
      // f는 flightList 배열에서 하나씩 꺼낸 항공편 객체 
      // req.params.id: URL 경로에 포함된 :id 값을 가져옴 
      // find()는 자바스크립트의 내장함수; 배열에서 조건을 만족ㅎ는 첫 번째 요소를 찾아 반환함
      // console.log(req);
      const flight = flights.find((f) => f.uuid === req.params.id);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
      // 항공편이 존재하면 [배열]에 담아 반환; 배열로 감싸는 이유는 테스트 코드가 res.body[0] 방식으로 응답을 확인하기 때문
      return res.status(200).json([flight]);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // [PUT] /flight/:id 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    let data;
    // TODO:
    // console.log(req.body);
    // console.log(req.params.id);
    try {
      const { id } = req.params;
      const index = flights.findIndex((f) => f.uuid === id);
      if (index === -1) return res.status(404).json({ message: 'Flight not fount' });

      flights[index] = { ...flights[index], ...req.body };
      data = flights[index];
      return res.status(200).json(flights[index]);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
