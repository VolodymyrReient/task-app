import styled from "styled-components";
import { StatsProps } from "../../types";
import { getChartColor } from "./utils";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PieChat = ({ percentage, status }: StatsProps) => {
  const stroke = getChartColor(status);

  return (
    <Wrapper>
      <svg viewBox="0 0 36 36" className="circle-svg">
        <path
          className="around"
          strokeDasharray="100, 100"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        ></path>
        <path
          className="percent"
          style={{ stroke }}
          strokeDasharray={`${percentage}, 100`}
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        ></path>
        <text x="18" y="14" textAnchor="middle" dy="7" fontSize="7">
          {percentage}%
        </text>
      </svg>
      <div className="status-text">{status.toUpperCase()}</div>
    </Wrapper>
  );
};

export default PieChat;
