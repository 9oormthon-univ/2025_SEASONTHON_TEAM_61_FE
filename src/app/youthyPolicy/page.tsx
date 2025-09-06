import DetailPolicy from "@/components/features/detailPolicy/DetailPolicy";

export default function YouthyPolicy({ searchParams }: { searchParams: { policyNo?: string } }){
    return <DetailPolicy policyNo={searchParams.policyNo}/>
}