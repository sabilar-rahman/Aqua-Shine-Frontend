import React from "react";
import HelmetExport from "react-helmet";


interface PageTitleProps {
    title: string;
  }

const PageTitle: React.FC<PageTitleProps>= ({ title }) => {
  return (
    <HelmetExport>
      <title>{title}</title>
    </HelmetExport>
  );
};

export default PageTitle;
