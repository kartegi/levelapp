import React, { createContext, ReactNode, useState } from "react";

import { ISkillListItems } from "../models/common.interface";
import { getAllSkills } from "../utils/database";

interface SkillsContextValues {
  skills: ISkillListItems[];
  getSkillsList: () => Promise<void>;
}

interface SkillsContextProviderProps {
  children: ReactNode;
}

export const SkillsContext = createContext<SkillsContextValues>({
  skills: [],
  getSkillsList: getAllSkills,
});

const SkillsContextProvider: React.FC<SkillsContextProviderProps> = ({
  children,
}) => {
  const [skills, setSkills] = useState<ISkillListItems[]>([]);

  const getSkillsList = async () => {
    try {
      console.log(skills);
      const result = await getAllSkills();
      setSkills(result.rows);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SkillsContext.Provider
      value={{
        skills,
        getSkillsList,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};

export default SkillsContextProvider;
