import { create } from "zustand";

const useSnackBar = create((set) => ({
  status: false,
  snackBarMessage: "",
  toggle: (snackBarMessage) => {
    set(() => ({ status: true, snackBarMessage: snackBarMessage }));
    setTimeout(() => set(() => ({ status: false, snackBarMessage: "" })), 1500);
  },
}));

const useSeats = create((set) => ({
  seats: [],
  addSeats: (newSeatNumber) =>
    set((state) => ({ seats: [...state.seats, newSeatNumber] })),
  removeSeats: (seatNumberToRemove) =>
    set((state) => ({
      seats: state.seats.filter((seat) => seat != seatNumberToRemove),
    })),
  resetSeats: () => set(() => ({ seats: [] })),
}));

const useSelectTime = create((set) => ({
  currentSelectedTime: "",
  selectTime: (time) => set(() => ({ currentSelectedTime: time })),
  resetTime: () => set(() => ({ currentSelectedTime: "" })),
}));

const useSelectDate = create((set) => ({
  currentSelectedDate: "",
  selectDate: (date) => set(() => ({ currentSelectedDate: date })),
  resetDate: () => set(() => ({ currentSelectedDate: "" })),
}));

export { useSnackBar, useSeats, useSelectDate, useSelectTime };
