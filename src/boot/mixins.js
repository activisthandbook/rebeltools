import { boot } from "quasar/wrappers";
import { Notify } from "quasar";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(calendar);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  calendar: {
    lastDay: "[Yesterday at] H:mm",
    sameDay: "[Today at] H:mm",
    nextDay: "[Tomorrow at] H:mm",
    lastWeek: "[Last] dddd [at] H:mm",
    nextWeek: "dddd [at] H:mm",
    sameElse: "D MMM YYYY, H:mm",
  },
});

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app }) => {
  // something to do
  app.mixin({
    methods: {
      mixin_mergeErrorMessages(errors) {
        let allErrorMessages = "";
        errors.forEach((error) => {
          if (allErrorMessages) {
            allErrorMessages = allErrorMessages + " " + error.$message;
          } else {
            allErrorMessages = error.$message;
          }
        });
        return allErrorMessages;
      },
      mixin_humanDate(firestoreTimestamp) {
        return dayjs(firestoreTimestamp.toDate()).calendar();
      },
      mixin_savedNotification(message) {
        Notify.create({
          message: message,
          color: "white",
          textColor: "black",
          iconColor: "grey",
          icon: "mdi-cloud-check",
          timeout: 300,
        });
      },
    },
  });
});
