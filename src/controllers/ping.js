const ping = (req, res) => {
  console.log("** API SERVER REQUEST -> ping()", req.body.ip);
  return res.status(201).json({
    airTableRecordId: res.locals.newRecordId,
  });
};

export { ping };
