import {
  IBookingRequest,
  IBookingRequestPatch
} from "../../../interfaces/bookings";

export const mockedBooking: IBookingRequest = {
  checkIn: "2023/01/01",
  checkout: "2023/07/01",
  userId: "",
  accommodationId: "",
};

//checkout antes do checkin
export const mockedBookingInvalidDate: IBookingRequest = {
  checkIn: "2023/01/01",
  checkout: "2022/07/01",
  userId: "",
  accommodationId: "",
};

export const mockedBookingPatch: IBookingRequestPatch = {
  status: "Canceled",
};

export const mockedBooking2: IBookingRequest = {
  checkIn: "2022/25/12",
  checkout: "2022/30/12",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking3: IBookingRequest = {
  checkIn: "2023/25/12",
  checkout: "2023/30/12",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking4: IBookingRequest = {
  checkIn: "2023/01/01",
  checkout: "2023/02/02",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking5: IBookingRequest = {
  checkIn: "2023/02/02",
  checkout: "2023/03/03",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking6: IBookingRequest = {
  checkIn: "2023/03/03",
  checkout: "2023/04/04",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking7: IBookingRequest = {
  checkIn: "2023/04/04",
  checkout: "2023/05/05",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking8: IBookingRequest = {
  checkIn: "2023/05/04",
  checkout: "2023/05/05",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking9: IBookingRequest = {
  checkIn: "2023/06/04",
  checkout: "2023/06/05",
  accommodationId: "1",
  userId: "1"
}

export const mockedBooking10: IBookingRequest = {
  checkIn: "2023/07/04",
  checkout: "2023/07/05",
  accommodationId: "1",
  userId: "1"
}

export const mockedUpdateBooking: IBookingRequestPatch = {
  checkIn: "2022/16/12",
  checkout: "2022/20/12",
  status: "booked"
}

export const mockedUpdateBooking2: IBookingRequestPatch = {
  checkIn: "2022/17/12",
  checkout: "2022/21/12",
  status: "booked"
}

export const mockedBookingWithoutAllFields: IBookingRequestPatch = {
  checkIn: "2022/16/12",
  status: "booked"
}

export const mockedBookingWithoutAllFields2: IBookingRequestPatch = {
  checkIn: "2022/16/12",
  status: "booked"
}