export const TimeRanges = [
  {
    name: "This week",
    range: [
      {
        start_date: new Date().getDate(),
        start_month: new Date().getMonth() + 1,
      },
      {
        end_date: new Date().getDate() + 6,
        end_month: new Date().getMonth() + 1,
      },
    ],
  },
  {
    name: "This month",
    range: [
      {
        start_date: 1,
        start_month: new Date().getMonth() + 1,
      },
      {
        end_date: new Date().setFullYear(
          new Date().getFullYear(),
          new Date().getMonth() + 1,
          0,
        ),
        end_month: new Date().getMonth() + 2,
      },
    ],
  },
  {
    name: "This quater",
    range: [
      {
        start_date: 1,
        start_month: new Date().getMonth() + 1,
      },
      {
        end_date: new Date().setFullYear(
          new Date().getFullYear(),
          new Date().getMonth() + 3,
          0,
        ),
        end_month: new Date().getMonth() + 4,
      },
    ]
  }
];
