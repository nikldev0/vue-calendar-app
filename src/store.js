import { seedData } from "./seed.js";
import { reactive } from "vue";

export const store = {
  state: {
    // adding reactive means that the view would automatically update when our application state changes
    data: reactive(seedData),
  },
  getActiveDay() {
    return this.state.data.find((day) => day.active);
  },
  setActiveDay(dayId) {
    this.state.data.map((dayObj) => {
      dayObj.id === dayId ? (dayObj.active = true) : (dayObj.active = false);
    });
  },
  submitEvent(eventDetails) {
    const activeDay = this.getActiveDay();
    activeDay.events.push({ details: eventDetails, edit: false });
  },
  editEvent(dayId, eventDetails) {
    this.resetEditOfAllEvents();
    const eventObj = this.getEventObj(dayId, eventDetails);
    eventObj.edit = true;
  },
  resetEditOfAllEvents() {
    this.state.data.map((dayObj) => {
      dayObj.events.map((event) => {
        event.edit = false;
      });
    });
  },
  updateEvent(dayId, originalEventDetails, newEventDetails) {
    const eventObj = this.getEventObj(dayId, originalEventDetails);
    // Set the event details to the new details
    eventObj.details = newEventDetails;
    // and turn off editing
    eventObj.edit = false;
  },
  deleteEvent(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    const eventIndexToRemove = dayObj.events.findIndex(
      (event) => event.details === eventDetails
    );
    dayObj.events.splice(eventIndexToRemove, 1);
  },
  // Helper Method
  getEventObj(dayId, eventDetails) {
    const dayObj = this.state.data.find((day) => day.id === dayId);
    return dayObj.events.find((event) => event.details === eventDetails);
  },
};
