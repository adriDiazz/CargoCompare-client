import { useNavigate } from "react-router";
import { useUserStore } from "../../common/stores/UserStore";

const HomePage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  // if (!user) {
  //   navigate("/login");
  // }

  return <div>Home page</div>;
};

export default HomePage;
