import { AttendanceModel, type attendanceType } from "../models/attendance";
import { HttpError, HttpStatus, checkMongooseErrors } from "../utils/errors";

export const getYouthAttendanceDay = async (date: Date, youthID: string) => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startOfDay = new Date(year, month, day); // -1 because JavaScript months are zero-based
    const endOfDay = new Date(year, month, day + 1);

    const youth = await AttendanceModel.find({
      timestamp: { $gte: startOfDay, $lt: endOfDay },
      youthId: youthID,
    });
    if (youth.length == 0) {
      return "Youth has not been marked for attendance on selected date.";
    } else {
      return youth;
    }
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Attendance retrieval failed",
      { cause: err },
    );
  }
};

export const addAttendanceEntry = async (attendanceFields: attendanceType) => {
  try {
    const newEntry = new AttendanceModel(attendanceFields);
    await newEntry.save();
    return newEntry;
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Event creation failed",
      { cause: err },
    );
  }
};

export const updateStatus = async (
  date: Date,
  youthID: string,
  status: string,
) => {
  try {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const startOfDay = new Date(year, month, day); // -1 because JavaScript months are zero-based
    const endOfDay = new Date(year, month, day + 1);

    const filter = {
      timestamp: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
      youthId: youthID,
    };

    const updateObj = { status: status, modified: "Yes" };
    const youth = await AttendanceModel.findOneAndUpdate(filter, updateObj, {
      new: true,
    });

    if (!youth) {
      return "Youth has not been marked for attendance on selected date.";
    } else {
      return youth;
    }
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Event retrieval failed",
      { cause: err },
    );
  }
};

export const getAttendanceInRange = async (startDay: Date, endDay: Date) => {
  try {
    const youths = await AttendanceModel.find({
      timestamp: { $gte: startDay, $lte: endDay },
    });

    if (youths.length == 0) {
      return "No youths have been marked for attendance within the specified date range.";
    } else {
      return youths;
    }
  } catch (err: unknown) {
    //rethrow any errors as HttpErrors
    if (err instanceof HttpError) {
      throw err;
    }
    //checks if mongoose threw and will rethrow with appropriate status code and message
    checkMongooseErrors(err);

    throw new HttpError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      "Attendance retrieval failed",
      { cause: err },
    );
  }
};
