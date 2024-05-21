import { FC } from "react";
import { ILogItem } from "../../../types";
import { BsFillPersonFill } from "react-icons/bs";
import { author, date, logItemWrap, messge } from "./LogItem.css";

type TLogItemProps = {
  logItem: ILogItem;
};
const LogItem: FC<TLogItemProps> = ({ logItem }) => {
  const timeOffset = new Date(Date.now() - Number(logItem.logTimestamp));

  const showOffsetTime = `
    ${timeOffset.getMinutes() > 0 ? `${timeOffset.getMinutes()}분 ` : ""}
    ${timeOffset.getSeconds() > 0 ? `${timeOffset.getSeconds()}초 ago` : ""}    
    ${timeOffset.getSeconds() === 0 ? "방금 전" : ""}
  `;
  return (
    <div className={logItemWrap}>
      <div className={author}>
        <BsFillPersonFill />
        {logItem.logAuthor}
      </div>
      <div className={messge}>{logItem.logMessage}</div>
      <div className={date}>{showOffsetTime}</div>
    </div>
  );
};

export default LogItem;
