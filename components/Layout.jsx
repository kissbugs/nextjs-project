import Link from "next/link";
import { Button } from "antd";

export default ({ children }) => {
  return (
    <>
      <div className="header">
        <Link href="/a?id=1">
          <Button>跳转A</Button>
        </Link>
        <Link href="/test/b">
          <Button>跳转B</Button>
        </Link>
      </div>
      <div className="body">{children}</div>
    </>
  );
};
