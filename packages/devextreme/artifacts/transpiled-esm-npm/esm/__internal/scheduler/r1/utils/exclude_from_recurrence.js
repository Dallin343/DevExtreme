import _extends from "@babel/runtime/helpers/esm/extends";
import dateSerialization from '../../../../core/utils/date_serialization';
import { createAppointmentAdapter } from '../../m_appointment_adapter';
const FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
const UTC_FULL_DATE_FORMAT = `${FULL_DATE_FORMAT}Z`;
const getSerializedDate = (date, startDate, isAllDay) => {
  if (isAllDay) {
    date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
  }
  return dateSerialization.serializeDate(date, UTC_FULL_DATE_FORMAT);
};
const createRecurrenceException = (appointmentAdapter, exceptionDate) => {
  const result = [];
  if (appointmentAdapter.recurrenceException) {
    result.push(appointmentAdapter.recurrenceException);
  }
  result.push(getSerializedDate(exceptionDate, appointmentAdapter.startDate, appointmentAdapter.allDay));
  return result.join();
};
export const excludeFromRecurrence = (appointment, exceptionDate, dataAccessors, timeZoneCalculator) => {
  const appointmentAdapter = createAppointmentAdapter(_extends({}, appointment), dataAccessors, timeZoneCalculator);
  appointmentAdapter.recurrenceException = createRecurrenceException(appointmentAdapter, exceptionDate);
  return appointmentAdapter;
};