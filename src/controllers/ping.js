const ping = (req, res) => {
  console.log("** API SERVER REQUEST -> ping()", req.body.ip);
  return res
    .status(200)
    .json({
      message: "Successfully saved",
      airTableRecordId: res.locals.newRecordId,
    });
};

export { ping };
