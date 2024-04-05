import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export const useBreadcrumbs = () => {

  // Setup router
  const router = useRouter()

  const pathWithoutQuery = router.asPath.split("?")[0];

  let pathArray = pathWithoutQuery.split("/");

  pathArray.shift();

  pathArray = pathArray.filter((path) => path !== "");

  const breadcrumbs = pathArray.map((path, index) => {
    const href = "/" + pathArray.slice(0, index + 1).join("/");
    const label = path.charAt(0).toUpperCase() + path.slice(1)
    label.replace("-"," ")
    return {
      href,
      label,
      isCurrent: index === pathArray.length - 1
    };
  });

  return {
    breadcrumbs
  }
}