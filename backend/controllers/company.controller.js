import { Company } from "../models/company.models.js";
import { User } from "../models/user.model.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    const user = await User.findById(req.id);
    console.log(req);

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required" });
    }
    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res.status(404).json({ message: "You cannot add same company" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered",
      company,
      userName: user.fullName,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({ message: "Companies not found" });
    }
    return res.status(200).json({
      message: "Companies fetched successfully",
      companies,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
  }
};

export const updateCompanyInformation = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };
    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    return res.status(200).json(company);
  } catch (error) {
    console.log(error);
  }
};
