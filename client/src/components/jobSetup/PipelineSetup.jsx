import DraggableStage from "../DraggableStage";

export default function PipelineSetup({ data, dataHandlers, title, status }) {
  return (
    <DraggableStage
      data={data}
      dataHandlers={dataHandlers}
      title={title}
      status={status}
    />
  );
}
