import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LoginSuccess() {
  const router = useRouter();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const next = params.get("state") || "/";
    router.push(next);
  }, [location, router]);

  return <p>로그인 중입니다...</p>;
}
