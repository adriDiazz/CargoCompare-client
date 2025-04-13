import { useParams } from "react-router";

import useProvider from "../hooks/useProvider";
import DetailsCard from "../companies/DetailsCard";
import Loader from "../../../common/components/ui/loader";

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, provider } = useProvider(id);

  return (
    <div>
      {loading && <Loader />}
      {error && <div>Error loading provider details</div>}

      {provider && <DetailsCard company={provider} />}
    </div>
  );
};

export default ProviderDetail;
