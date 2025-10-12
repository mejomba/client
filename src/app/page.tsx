import PcbCard from "@/components/SingleCart";


export default function Home() {
  return (
      <div>
          <main className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* کارت‌ها */}
  <PcbCard
    title="1 - 4 Layers"
    price="$2"
    buildTime="24 hours"
    items={[
      "1-2L - $2 for 100×100mm PCBs",
      "4L - $2 for 50×50mm PCBs",
      "FR4, Aluminum, Copper, Rogers, PTFE",
    ]}
    image="/images/s1.png"
    isFeatured={false}
  />

  <PcbCard
    title="6 - 32 Layers"
    price="$2"
    buildTime="4 days"
    items={[
      "6-8L - $2 for 50×50mm PCBs",
      "6-32L - Free via-in-pad with POFV",
      "Controlled impedance PCB",
    ]}
    image="/images/s1.png"
    isFeatured={true}
  />

                  <PcbCard
    title="1 - 4 Layers"
    price="$2"
    buildTime="24 hours"
    items={[
      "1-2L - $2 for 100×100mm PCBs",
      "4L - $2 for 50×50mm PCBs",
      "FR4, Aluminum, Copper, Rogers, PTFE",
    ]}
    image="/images/s1.png"
    isFeatured={false}
  />

                  <PcbCard
    title="1 - 4 Layers"
    price="$2"
    buildTime="24 hours"
    items={[
      "1-2L - $2 for 100×100mm PCBs",
      "4L - $2 for 50×50mm PCBs",
      "FR4, Aluminum, Copper, Rogers, PTFE",
    ]}
    image="/images/s1.png"
    isFeatured={false}
  />

                  <PcbCard
    title="1 - 4 Layers"
    price="$2"
    buildTime="24 hours"
    items={[
      "1-2L - $2 for 100×100mm PCBs",
      "4L - $2 for 50×50mm PCBs",
      "FR4, Aluminum, Copper, Rogers, PTFE",
    ]}
    image="/images/s1.png"
    isFeatured={false}
  />

</div>

          </main>
      </div>
  );
}
