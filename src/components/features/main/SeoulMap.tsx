import SeoulDistricts from '@/components/icons/SeoulDistricts';
import { DistrictName } from '@/types/policy';

interface SeoulMapProps {
  onDistrictClick: (district: DistrictName) => void;
  // selectedDistrict?: DistrictName | null;
}

export default function SeoulMap({ onDistrictClick }: SeoulMapProps) {
  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const target = e.target as SVGPathElement;
    if (target.id) {
      onDistrictClick(target.id as DistrictName);
    }
  };

  return (
    <div className="w-full max-w-3xl flex flex-col items-center justify-center mx-auto">
     
      <SeoulDistricts
        className="w-full h-auto [&_path]:cursor-pointer [&_path]:transition-colors [&_path]:duration-200 [&_path:hover]:fill-[#91C5FF]"
        onClick={handleClick}
        // selectedDistrict={selectedDistrict}
      />
    </div>
  );
}
