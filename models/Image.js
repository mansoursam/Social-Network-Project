const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  image: { type: String },
  backgroundImage: { type: String }
});
const Image = mongoose.model("image", ImageSchema);
module.exports = Image;
