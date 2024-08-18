import MediaCard from '@/components/ui/MediaCard';

export const metadata = {
  title: 'Join Community',
};

// this way of writing static pages with content is not professional, we gonna use MDX later.
export default () => {
  return (
    <div className="flex flex-col px-4 pt-4 pb-2 w-full text-lg tracking-tight bg-white text-stone-900">
      <div className="flex gap-5 justify-between py-3 w-full">
        <div className="flex gap-5 justify-between">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5d4e85e6738b64d0728aec2f474386a87b27da3621d76aa9ed72b763aca7fc97?apiKey=0e320efca8144df880119cff37931efc&"
            className="shrink-0 w-6 aspect-square"
            alt="Innovo Hunt Logo"
          />
          <div>Ino Hunt</div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/89638f972cbbf39a86bf22344fc24af53953020bef8fa9e966120a69db3567db?apiKey=0e320efca8144df880119cff37931efc&"
          className="shrink-0 w-6 aspect-square"
          alt="Placeholder Image"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex gap-2 justify-center py-1.5 pr-2 pl-4 whitespace-nowrap bg-lime-50 rounded-2xl">
          <div>Subsector</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3274726c100884d4b2a4dd12bacb4338f587377554de5890bd7540fd4f429a3f?apiKey=0e320efca8144df880119cff37931efc&"
            className="shrink-0 self-start w-5 aspect-square"
            alt="Placeholder Image"
          />
        </div>
        <div className="flex gap-2 justify-center py-1.5 pr-2 pl-4 bg-lime-50 rounded-2xl">
          <div>SDGs Addressed</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9b1cd2ace86e898abef780479052e68766c281e1cefaa7f0b160a1f30b74692?apiKey=0e320efca8144df880119cff37931efc&"
            className="shrink-0 self-start w-5 aspect-square"
            alt="Placeholder Image"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center py-1.5 pr-2 pl-4 mt-3 bg-lime-50 rounded-2xl">
        <div>Indicative Return</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c4f486e3f75de676b9984a7f124a22cb46e953c37931c6c6ce432554eb9f2a43?apiKey=0e320efca8144df880119cff37931efc&"
          className="shrink-0 self-start w-5 aspect-square"
          alt="Placeholder Image"
        />
      </div>
      <div className="flex gap-3 mt-3">
        <div className="flex gap-2 justify-center py-1.5 pr-2 pl-4 bg-lime-50 rounded-2xl">
          <div>Investment Timeframe</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4516a5da9dc1f73d7836d55a01301f0f68017aea8689c1c25fc7a49339c2f2a3?apiKey=0e320efca8144df880119cff37931efc&"
            className="shrink-0 self-start w-5 aspect-square"
            alt="Placeholder Image"
          />
        </div>
        <div className="flex gap-2 justify-center py-1.5 pr-2 pl-4 bg-lime-50 rounded-2xl">
          <div>Ticket Size</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/388f30b974acd650c4f866f8360b0e5632717fd0f381f9754c05e2278e43fef2?apiKey=0e320efca8144df880119cff37931efc&"
            className="shrink-0 self-start w-5 aspect-square"
            alt="Placeholder Image"
          />
        </div>
      </div>
      <div className="flex gap-2 justify-center self-start py-1.5 pr-2 pl-4 mt-3 bg-lime-50 rounded-2xl">
        <div>Market Size</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a5b104cc2df7557bf21c4da97fb701c117ca9b6ca12fce50b33a596b8b432b22?apiKey=0e320efca8144df880119cff37931efc&"
          className="shrink-0 self-start w-5 aspect-square"
          alt="Placeholder Image"
        />
      </div>

      <div className="flex flex-wrap gap-3">
      <MediaCard
  image="https://cdn.builder.io/api/v1/image/assets/TEMP/8c1b2a6c99f9898d58beafbbcdd9c81b8cac06da144f74f5ecea98089f321d7c?apiKey=0e320efca8144df880119cff37931efc&width=400"
  title="Access to Finance For Small and Medium Enterprises"
  subtitle="FINANCIALS - Commercial Banks, Cambodia"
  description="Expected impact: Provision of affordable loans for SMEs using customer-centric approaches."
  investment="15% -25% returns"
/>

<MediaCard
  image="https://cdn.builder.io/api/v1/image/assets/TEMP/c4b3d1c567354358e7fc25cdb81527d70d7b82a56c22cbe3ac62d17a707a6145?apiKey=0e320efca8144df880119cff37931efc&width=400"
  title="Accessible financing for the family agricultural sector and MSMEs"
  subtitle="FINANCIALS - Paraguay"
  description="Expected impact: Increasing financing alternatives to improve agricultural outputs, reduce poverty."
  investment="25% -35% returns"
/>

<MediaCard
  image="https://cdn.builder.io/api/v1/image/assets/TEMP/be2200a23efae02f000dbb0c8c697237421fbc297a168a745b0204714c24e17d?apiKey=0e320efca8144df880119cff37931efc&width=400"
  title="Access to finance through innovative financing mechanisms"
  subtitle="FINANCIALS - Philippines"
  description="Expected impact: Increased access to finance for micro and small enterprises, particularly in the agriculture sector."
  investment="20% -35% returns"
/>

      </div>
    </div>

  );
};
