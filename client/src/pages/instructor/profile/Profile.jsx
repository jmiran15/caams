import { Stack } from "@mantine/core";
import { useContext, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import Basic from "./Basic";
import { PocketbaseContext } from "../../../context/PocketbaseContext";

// async function getCompany(user, setCompany) {
//   const company = await pb.collection("company").getOne(user.company);
//   setCompany(company);
// }

// async function saveCompany(company, data, setCompany) {
//   const updatedCompany = await pb
//     .collection("company")
//     .update(company.id, data);
//   setCompany(updatedCompany);
// }

export default function Profile() {
  const pb = useContext(PocketbaseContext);
  const [user, setUser] = useState(pb.authStore.model);
  // const [company, setCompany] = useState(null);
  const [editingProfile, editingProfileHandlers] = useDisclosure(false);
  // const [editingCompany, editingCompanyHandlers] = useDisclosure(false);
  // const isAdmin = () => pb.authStore.model.admin === "";

  // useEffect(() => {
  //   getCompany(user, setCompany);
  // }, []);

  async function save(user, data, setUser) {
    let record;
    try {
      record = await pb.collection("user").update(user.id, data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setUser(record);
    }
  }

  return (
    <Stack px="180px" py="xl">
      {/* <SettingCard title="Company">
        {company && (
          <Company
            editingCompany={editingCompany}
            editingCompanyHandlers={editingCompanyHandlers}
            company={company}
            saveCompany={saveCompany}
            setCompany={setCompany}
            admin={isAdmin()}
          />
        )}
      </SettingCard> */}
      {user && (
        <Basic
          editingProfile={editingProfile}
          editingProfileHandlers={editingProfileHandlers}
          user={user}
          setUser={setUser}
          save={save}
        />
      )}
    </Stack>
  );
}
