import { StaffModel, staffType } from "../models/staff";

export const createStaff = async (staff: staffType) => {
  const newStaff = new StaffModel(staff);
  await newStaff.save();
  return newStaff;
};

export const updateStaff = async (
  firebaseUID: string,
  update: { key: string; value: string },
) => {
  const updateObj = { $set: { [update.key]: update.value } };
  const staff = await StaffModel.findOneAndUpdate({ firebaseUID }, updateObj);
  if (!staff) throw new Error("Staff not found");
};

export const getAllStaff = async () => {
  const allStaff = await StaffModel.find({});
  if (!allStaff) throw new Error("No staff found");
  return allStaff;
};

export const getStaffByEmail = async (email: string) => {
  const staff = await StaffModel.findOne({ email });
  if (!staff) throw new Error("Staff not found");
  return staff;
};

export const getStaffByID = async (firebaseUID: string) => {
  const staff = await StaffModel.findOne({ firebaseUID });
  if (!staff) throw new Error("Staff not found");
  return staff;
};

export const getStaffByActive = async () => {
  const staff = await StaffModel.find({ active: true });
  if (!staff) throw new Error("Staff not found");
  return staff;
};

export const getStaffByInactive = async () => {
  // Unneeded? Router just uses getStaffByActive(active: false)
  const staff = await StaffModel.find({ active: false });
  if (!staff) throw new Error("Staff not found");
  return staff;
};

export const getStaffByProgram = async (programs: string[]) => {
  const staff = await StaffModel.find({ programs });
  if (!staff) throw new Error("Staff not found");
  return staff;
};
