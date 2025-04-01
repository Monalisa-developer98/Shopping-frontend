const invalidEmail = "Please enter a valid email address.";
const emailRequired = "Email address is required.";
const otpRequired = "OTP is required.";
const otpType = "OTP must be a numeric value.";
const confirmPasswordRequired = "Confirm password is required.";
const confirmAndMainPasswordMatch =
  "Password and confirm password do not match.";
const passwordRequired = "Password is required.";
const passwordRegex =
  "8+ character with one uppercase, lowercase, number and special characters";
const otpCountDownMessage = "Resend OTP in :";
const logOutMessage = "Do you want to logout from the application ?";
const titleRequired = "Please enter a title.";
const descriptionRequired = "Please enter description.";
const dateRequired = "Please enter a valid date.";
const timeRequired = "Please enter a valid time.";
const roomRequired = "Please enter a valid room.";
const unitRequired = "Please enter a valid unit";
const linkRequired = "Please enter a url.";
const invalidLink = "Please enter a valid url.";
const locationRequired = "Please enter location.";
const nameRequired = "Please enter a name.";
const invalidName = "Please enter a valid name.";
const invalidDesignation = "Please enter a valid designation";
const invalidCompanyName = "Please enter a valid company name";
const duplicateAttendee = "Attendee already added.";
const deleteAttendeeMessage = "Do you want to remove ?";
const selectAttendee = "Please select minimum one attendee.";
const invalidFromHour = "Invalid From Hour.";
const invalidToHour = "Invalid To Hour.";
const invalidFromMinute = "Invalid From Minute.";
const invalidToMinute = "Invalid To Minute.";
const invalidDate = "Invalid Date.";
const addAgenda = "Please add agenda.";
const addAttendee = "Please add attendee.";
const invalidTime = "Please enter valid time.";
const cancelMeeting = "Do you want to cancel this meeting ?";
const remarksRequired = "Please give remark.";
const meetingCreated = "Meeting created successfully. Please add attendees.";
const invalidFromDate = "From date must be less than To date";
const serverErrorMessage =
  "Sorry, something went wrong. Please try again later.";
const roomUnavailable = "The room is already booked for the selected date and time range.";  
const responsiblePersonRequired = "Please add responsible person.";
const priorityRequired = "Please add priority.";
const detailsRequired = "Please enter detail.";
const titleRegexError = "Allowed Inputs: (a-z, A-Z, 0-9, space, comma, dash)";
const descriptionLengthError = "Description length must be between 3 & 30!";
const stringLengthError =
  "Please enter minimum 5 characters & maximum 100 characters!";
const largeStringLengthError =
  "Please enter minimum 3 characters & maximum 200 characters!";
const minuteCreated =
  "Minute created successfully. Check preview section to manage.";
const nameLengthError =
  "Please enter minimum 3 characters & maximum 30 characters!";
const commentsRequired = "Please enter your comments here.";
const notificationAdded = "New Notification.";
const reasonRequired = "Please provide reason.";
const smallStringLengthError =
  "Please enter minimum 3 characters & maximum 100 characters!";
const dateMoreThanMeetingDate =
  "Please give a date grater than or equals to meeting date.";
const rsvpConfirmationMessage = async (rsvp) => {
  return `Your response (${rsvp}) has been updated successfully. Thank you.`;
};
const invalidInput = "Allowed Inputs: (a-z, A-Z, 0-9, space, comma, dash)";
const characterSizeTitle = "Title must be between 2 - 100 characters";
const characterSizeLocation = "Location must be between 2 - 100 characters";
const organizationNameSize = "Organization must be between 2 - 100 characters";
const invalidReason = "Please enter valid reason (html tags are not allowed)";
const accountIdRequired = "Please give account Id";
const clientIdRequired = "Please give client Id";
const secretTokenRequired = "Please give secret token";
const htmlTagsNotAllowed = "Html tags are not allowed";
const hostKeyRequired = "Please give host key";
const characterSizeDesignation = "Designation must be between 2 - 100 characters";
const characterSizeOrg = "Organization must be between 2 - 100 characters";
const titleLengthErrorMessage = "Title must be between 5-200  characters";
const invalidFile = "Unsupported file type. Please upload a JPEG or PNG image."
const imageDimensionError = "File size exceeds the limit of 200 KB."
  const dropZoneHints = "File size limit should be maximum 200 KB & File type must be PNG,JPG & JPEG only"
  const invalidFollowOnMeetingFromHour="From hour must be greater than or equals to parent meeting To hour";
  const invalidFollowOnMeetingFromMinute="From minute must be greater than from parent meeting to minute";
  const forwardedToRequired="Please select an employee to forward lead";
module.exports = {
  invalidCompanyName,
  invalidDesignation,
  invalidFromDate,
  smallStringLengthError,
  rsvpConfirmationMessage,
  notificationAdded,
  dateMoreThanMeetingDate,
  commentsRequired,
  nameLengthError,
  reasonRequired,
  minuteCreated,
  descriptionLengthError,
  stringLengthError,
  titleRegexError,
  priorityRequired,
  detailsRequired,
  responsiblePersonRequired,
  serverErrorMessage,
  meetingCreated,
  remarksRequired,
  cancelMeeting,
  addAttendee,
  invalidTime,
  addAgenda,
  invalidDate,
  invalidFromHour,
  invalidToHour,
  invalidFromMinute,
  invalidToMinute,
  deleteAttendeeMessage,
  duplicateAttendee,
  invalidName,
  locationRequired,
  nameRequired,
  invalidLink,
  linkRequired,
  invalidEmail,
  emailRequired,
  confirmPasswordRequired,
  confirmAndMainPasswordMatch,
  otpType,
  otpRequired,
  passwordRequired,
  passwordRegex,
  otpCountDownMessage,
  logOutMessage,
  titleRequired,
  dateRequired,
  timeRequired,
  roomRequired,
  invalidInput,
  characterSizeTitle,
  organizationNameSize,
  characterSizeLocation,
  largeStringLengthError,
  selectAttendee,
  invalidReason,
  unitRequired,
  accountIdRequired,
  clientIdRequired,
  secretTokenRequired,
  htmlTagsNotAllowed,
  hostKeyRequired,
  descriptionRequired,
  characterSizeDesignation,
  characterSizeOrg,
  titleLengthErrorMessage,
  invalidFile,
  imageDimensionError,
  dropZoneHints,
  invalidFollowOnMeetingFromMinute,
  invalidFollowOnMeetingFromHour,
  roomUnavailable,
  forwardedToRequired
};
