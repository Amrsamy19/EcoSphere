"use client";

interface BranchMapProps {
  shopName: string;
}

const BranchMap = ({ shopName }: BranchMapProps) => {
  // Use Google Maps search to find all branches by shop name
  const searchQuery = encodeURIComponent(shopName);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-border">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://maps.google.com/maps?q=${searchQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        title={`${shopName} Locations`}
      ></iframe>
    </div>
  );
};

export default BranchMap;
