import DraggableStage from "../DraggableStage";

export default function Scorecard({ data, dataHandlers, title }) {
  return (
    <DraggableStage data={data} dataHandlers={dataHandlers} title={title} />
  );
}
