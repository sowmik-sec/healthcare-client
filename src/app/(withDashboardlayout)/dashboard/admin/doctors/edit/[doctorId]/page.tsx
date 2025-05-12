"use client";
type TParams = {
  params: {
    doctorId: string;
  };
};

const DoctorUpdatePage = ({ params }: TParams) => {
  console.log(params?.doctorId);
  return <div>update doctor info</div>;
};

export default DoctorUpdatePage;
