module.exports = (mongoose) => {
  // Set model
  const Group = mongoose.model(
    "group",
    mongoose.Schema(
      {
        name: String,
        raid: String,
        difficulty: String,
        done: Boolean,
        member: [
          {
            name: String,
            CharacterName: String,
            CharacterClassName: String,
            ItemMaxLevel: Number,
          },
        ],
      },
      { timestamps: true }
    )
  );

  return Group;
};
