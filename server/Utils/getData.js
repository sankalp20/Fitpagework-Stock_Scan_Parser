import Scan from "../models/Scan.js";

async function getData(req, res) {
  try {
    // Use Mongoose to find all documents in the Scan collection, excluding _id and __v fields
    const data = await Scan.find({}, { _id: 0, __v: 0 })
    // Sort the results based on the 'id' field in ascending order
      .sort({ id: 1 })
      .populate({
        // Populate the 'criteria' field by replacing the criteria IDs with the actual criteria documents
        path: "criteria",
        select: "-_id -__v",
      });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getData };
