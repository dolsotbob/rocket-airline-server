const flights = require('../repository/flightList');
// (서버가 실행되는 동안 메모리에) 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 기능: 요청된 flight_uuid 또는 phone 쿼리값으로 예약 조회
  // 아무 조건 없으면 전체 예약 조회 
  findById: (req, res) => {
    // TODO:
    // console.log(req);

    const { flight_uuid, phone } = req.query;

    if (flight_uuid) {
      const filtered = booking.filter((b) => b.flight_uuid === flight_uuid);
      if (filtered.length === 0) {
        return res.status(404).json({ message: 'Booking not Found' });
      }

      return res.status(200).json(filtered);
    }

    if (phone) {
      const found = booking.filter((b) => b.phone === phone);
      if (found.length === 0) {
        return res.status(404).json({ message: 'Booking not Found ' });
      }

      return res.status(200).json(found[0]);
    }

    // 전체 데이터 
    return res.status(200).json(booking);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  // 응답으로는 book_id를 리턴합니다.
  // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답에 더욱 적합합니다.
  // 참고 링크: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#useful-post-responses
  create: (req, res) => {
    // TODO:
    // console.log(req.body);
    // 구조 분해 하는 것으로 시작 
    const { flight_uuid, name, phone } = req.body;
    // const booking = { flight_uuid, name, phone };
    if (!flight_uuid || !name || !phone) {
      return res.status(400).json({ message: 'Bad Request' });
    }

    const newBooking = { flight_uuid, name, phone };
    booking.push(newBooking);

    // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답
    res.location(`/book/${flight_uuid}`);

    // 응답으로는 book_id를 리턴
    // 200이 아닌 201임  
    return res.status(201).json({ book_id: flight_uuid });
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: (req, res) => {
    // TODO:
    const { phone } = req.query;

    // 요청 된 phone 값과 동일한 예약 데이터를 삭제한다 
    booking = booking.filter((b) => b.phone !== phone);
    return res.status(200).json(booking);
  },
};
