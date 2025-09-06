import PolicyList from "@/components/features/policyList/PolicyList";

interface PolicyListPageProps {
  searchParams: {
    category?: string;
  };
}

export default function PolicyListPage({ searchParams }: PolicyListPageProps) {
  const category = searchParams.category;

  return <PolicyList category={category} />
}