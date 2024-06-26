import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { neynar } from 'frog/middlewares'
import { 
  Box, 
  Column, 
  Divider,
  Image,
  Icon,
  Text, 
  Spacer, 
  vars 
} from "../lib/ui.js";


// Uncomment this packages to tested on local server
// import { devtools } from 'frog/dev';
// import { serveStatic } from 'frog/serve-static';

// Initialize Frog App
export const app = new Frog({
  assetsPath: '/',
  basePath: '/api/frame',
  ui: { vars },
  imageAspectRatio: '1:1',
  headers: {
    'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate max-age=0, s-maxage=0',
  },
  imageOptions: {
    height: 1024,
    width: 1024,
  },
  browserLocation: 'https://warpcast.com/~/add-cast-action?url=https://farther-tips.vercel.app/api/frame/farther-tips',
}).use(
  neynar({
    apiKey: process.env.NEYNAR_API_KEY || 'NEYNAR_API_DOCS',
    features: ['interactor', 'cast'],
  }),
)


app.frame('/', async (c) => {
  return c.res({
    title: 'Farther Tips',
    image: '/tips',
    intents: [
      <Button.AddCastAction action='/farther-tips'>
        Install Action
      </Button.AddCastAction>,
    ],
  })
})


app.castAction(
  '/farther-tips',
  (c) => {
    const castId = JSON.stringify(c.actionData.castId);

    // Parse the message back to an object to extract fid
    const parsedCastId = JSON.parse(castId);
    const fid = parsedCastId.fid;

    return c.frame({ path: `/farther-tips-action/${fid}`})
  }, 
  { name: "Farther Tips ✨", icon: "moon", description: "A Farcaster Cast Action to check Farther Tip Allowance.", aboutUrl: 'https://farther.social/tips'}
)


app.frame('/farther-tips-action/:fid', async (c) => {
  const { fid } = c.req.param();
  const params = { fid: fid };
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  const apiUrl = `https://farther.social/api/v1/public.user.byFid?input=${encodedParams}`;

  // Fetch the user data in parallel with other potential API calls
  try {
    const [responseUser] = await Promise.all([fetch(apiUrl)]);

    if (!responseUser.ok) {
      const errorData = await responseUser.json();
      if (errorData.error && errorData.error.code === -32004) {
        return c.error({
          message: `User not found in database!`,
        });
      } else {
        return c.error({
          message: `HTTP error! Status: ${responseUser.status}`,
        });
      }
    }

    return c.res({
      title: 'Farther Tips Allowance ✨',
      image: `/check/${fid}`,
      intents: [
        <Button action={`/farther-tips-action/${fid}`}> Refresh </Button>,
        <Button action='/check-mine'> My Stats </Button>,
        <Button.Link href='https://warpcast.com/0x94t3z.eth/0x80c10619'> ✨ Tip </Button.Link>,
      ],
    });
  } catch (error) {
    return c.error({
      message: `An error occurred: ${error}`,
    });
  }
});


app.frame('/check-mine', async (c) => {
  const { fid } = c.var.interactor || {};
  const params = { fid: fid };
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  const apiUrl = `https://farther.social/api/v1/public.user.byFid?input=${encodedParams}`;

  // Fetch the user data in parallel with other potential API calls
  try {
    const [responseUser] = await Promise.all([fetch(apiUrl)]);

    if (!responseUser.ok) {
      const errorData = await responseUser.json();
      if (errorData.error && errorData.error.code === -32004) {
        return c.error({
          message: `User not found in database!`,
        });
      } else {
        return c.error({
          message: `HTTP error! Status: ${responseUser.status}`,
        });
      }
    }

    return c.res({
      title: 'Farther Tips Allowance ✨',
      image: `/check/${fid}`,
      intents: [
        <Button action='/check-mine'> Refresh </Button>,
        <Button action='/check-mine'> My Stats </Button>,
        <Button.Link href='https://warpcast.com/0x94t3z.eth/0x80c10619'> ✨ Tip </Button.Link>,
      ],
    });
  } catch (error) {
    return c.error({
      message: `An error occurred: ${error}`,
    });
  }
});


app.image('/tips', async (c) => {
  return c.res({
    headers: {
      'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate max-age=0, s-maxage=0',
    },
    image: (
      <Box
        grow
        flexDirection="column"
        alignHorizontal="center"
        backgroundColor="bg"
        padding="48"
        height="100%"
        gap="4"
      >
        <Box 
          borderColor="white"
          height="64"
          width="100%"
        >
          <Box grow flexDirection="row" gap="8">
            <Column width="2/4" padding="12" paddingLeft="0" flexDirection="row" alignHorizontal="left">
              <Divider direction="vertical" color="yellow" />
              <Divider direction="vertical" color="yellow" />
              <Spacer size="10" />
              <Text color="white" weight="400" align="center" size="32">
                Farther Tips
              </Text>
            </Column>
            <Column 
              width="2/4" 
              padding="8" 
              paddingLeft="0" 
              paddingRight="0"
              flexDirection="row" 
              alignHorizontal="right"
            >
              <Box 
                borderStyle="solid"
                borderWidth="1"
                borderColor="yellow"
                backgroundColor="lightGrey"
                flexDirection="row" 
                borderRadius="8"
                padding="8"
                paddingLeft="20"
                paddingRight="20"
                height="48"
                alignVertical="center"
                maxWidth="100%"
              >
                <Image
                  height="28"
                  width="28"
                  objectFit="cover"
                  borderRadius="48"
                  src='https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/d523769a-c865-4907-3602-d8f391fed600/rectcrop3'
                />
                <Spacer size="10" />
                <Text color="yellow" weight="600" align="center" size="16">
                  0x94t3z 📟 ✦⁺
                </Text>
              </Box>
            </Column>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="128"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
             CYCLE START TIME
          </Text>

          <Spacer size="12" />

          <Text color="white" weight="400" align="left" size="20">
             Jun 22, 2024 2:00 AM
          </Text>

          <Spacer size="14" />
         
          <Box 
            flexDirection="column" 
            alignHorizontal="left" 
            alignVertical="center"
          >
            <Box 
              flexDirection="row" 
              alignHorizontal="left" 
              alignVertical="center"
            >
              <Text color="grey" weight="400" align="left" size="16">
                Tip minimum:
              </Text>
              <Spacer size="28" />
              <Text color="white" align="right" size="16">
                119 ✨
              </Text>
              <Spacer size="6" />
              <Icon name="info" color="white" size="12" />
            </Box>

            <Box 
              flexDirection="row" 
              alignHorizontal="left" 
              alignVertical="center"
            >
              <Text color="grey" weight="400" align="left" size="16">
                Eligible tippers:
              </Text>
              <Spacer size="14" />
              <Text color="white" align="right" size="16">
                204
              </Text>
              <Spacer size="6" />
              <Icon name="info" color="white" size="12" />
            </Box>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="18"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
            JUN 22 CYCLE
          </Text>
        </Box>

        <Box 
          borderStyle="solid"
          borderWidth="1"
          borderRadius="8"
          padding="18"
          paddingLeft="24"
          borderColor="lightGrey"
          height="128"
          width="100%"
        >
          <Box grow flexDirection="row" gap="2">
            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="600" align="left" size="16">
                    Allowance
                  </Text>
                  <Spacer size="10" />
                  <Text color="white" weight="600" align="right" size="16">
                    3,594 ✨
                  </Text>
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="left" size="16">
                    Given
                  </Text>
                  <Spacer size="48" />
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (0 tips)
                  </Text>
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="left" size="16">
                    Remaining
                  </Text>
                  <Spacer size="14" />
                  <Text color="white" align="right" size="16">
                    3,594 ✨
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="600" align="right" size="16">
                    Received
                  </Text>
                  <Spacer size="10" />
                  <Text color="white" weight="600" align="right" size="16">
                    150 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    (1 tips)
                  </Text>
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="right" size="16">
                    Rank
                  </Text>
                  <Spacer size="44" />
                  <Text color="white" align="right" size="16">
                    77 🏁
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="18"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
            TOTALS
          </Text>
        </Box>

        <Box 
          borderStyle="solid"
          borderWidth="1"
          borderRadius="8"
          padding="20"
          paddingLeft="24"
          borderColor="lightGrey"
          height="96"
          width="100%"
        >
          <Box grow flexDirection="row" gap="2">
            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Text color="grey" weight="600" align="left" size="16">
                  Given
                </Text>
                <Spacer size="10" />
                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="white" weight="600" align="left" size="16">
                    9,600 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="600" align="left" size="16">
                    (11 tips)
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Text color="grey" weight="600" align="left" size="16">
                  Received
                </Text>
                <Spacer size="10" />
                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  <Text color="white" weight="600" align="right" size="16">
                    14,7628.08 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    (63 tips)
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
  })
})


app.image('/check/:fid', async (c) => {
  const { fid } = c.req.param();

  // Make the API requests in parallel
  const [responseMeta, responseUser] = await Promise.all([
    fetch('https://farther.social/api/v1/public.tips.meta'),
    fetch(`https://farther.social/api/v1/public.user.byFid?input=${encodeURIComponent(JSON.stringify({ fid }))}`)
  ]);

  // Check if the responses are OK (status code 200-299)
  if (!responseMeta.ok || !responseUser.ok) {
    throw new Error(`HTTP error! Status: ${responseMeta.status}, ${responseUser.status}`);
  }

  // Parse the JSON responses
  const [meta, userData] = await Promise.all([
    responseMeta.json(),
    responseUser.json()
  ]);

  const { tipMinimum, _count: { allowances } } = meta.result.data[0];

  const { displayName, pfpUrl, tips } = userData.result.data;
  const truncatedDisplayName = displayName.length > 15 ? displayName.substring(0, 15) + '...' : displayName;
  
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: true,
    timeZoneName: 'short'
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);

  // Array of unsupported image URLs
  const unsupportedImageUrls = [
    'https://supercast.mypinata.cloud/ipfs/QmUaMVEfNYXhpbzj5cyw1BTRtGivYuTTwAWK5RpREEhyex?filename=glitch-art-studio.gif',
    // Add more URLs if needed
  ];

  // Fallback image URL
  const fallbackImageUrl = 'https://warpcast.com/avatar.png';

  // Check if the pfpUrl is in the unsupported image URLs array
  const isUnsupportedImage = unsupportedImageUrls.includes(pfpUrl);

  // Determine the image URL to use
  const imageUrl = isUnsupportedImage ? fallbackImageUrl : pfpUrl;

  const { rank, totals, currentCycle } = tips;

  const startTime = new Date();
  const month = startTime.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = startTime.getDate();
  const currentCycleDate = `${month} ${day}`;

  const user_rank = rank || 0;
  
  const total_given = totals.givenCount || 0;
  const amount_given = totals.givenAmount || 0;
  const total_received = totals.receivedCount || 0;
  const amount_received = totals.receivedAmount || 0;

  const allowance = currentCycle ? currentCycle.allowance || 0 : 0;
  const remaining_allowance = currentCycle ? currentCycle.remainingAllowance || 0 : 0;
  const current_total_given = currentCycle ? currentCycle.givenCount || 0 : 0;
  const current_amount_given = currentCycle ? currentCycle.givenAmount || 0 : 0;
  const currect_total_received = currentCycle ? currentCycle.receivedCount || 0 : 0;
  const currect_amount_received = currentCycle ? currentCycle.receivedAmount || 0 : 0;

  return c.res({
    headers: {
      'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate max-age=0, s-maxage=0',
    },
    image: (
      <Box
        grow
        flexDirection="column"
        alignHorizontal="center"
        backgroundColor="bg"
        padding="48"
        height="100%"
        gap="4"
      >
        <Box 
          borderColor="white"
          height="64"
          width="100%"
        >
          <Box grow flexDirection="row" gap="8">
            <Column width="2/4" padding="12" paddingLeft="0" flexDirection="row" alignHorizontal="left">
              <Divider direction="vertical" color="yellow" />
              <Divider direction="vertical" color="yellow" />
              <Spacer size="10" />
              <Text color="white" weight="400" align="center" size="32">
                Farther Tips
              </Text>
            </Column>
            <Column 
              width="2/4" 
              padding="8" 
              paddingLeft="0" 
              paddingRight="0"
              flexDirection="row" 
              alignHorizontal="right"
            >
              <Box 
                borderStyle="solid"
                borderWidth="1"
                borderColor="yellow"
                backgroundColor="lightGrey"
                flexDirection="row" 
                borderRadius="8"
                padding="8"
                paddingLeft="20"
                paddingRight="20"
                height="48"
                alignVertical="center"
                maxWidth="100%"
              >
                <Image
                  height="28"
                  width="28"
                  objectFit="cover"
                  borderRadius="48"
                  src={imageUrl}
                />
                <Spacer size="10" />
                <Text color="yellow" weight="600" align="center" size="16">
                  {truncatedDisplayName}
                </Text>
              </Box>
            </Column>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="128"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
             CYCLE START TIME
          </Text>

          <Spacer size="12" />

          <Text color="white" weight="400" align="left" size="20">
             {formattedDate}
          </Text>

          <Spacer size="14" />
         
          <Box 
            flexDirection="column" 
            alignHorizontal="left" 
            alignVertical="center"
          >
            <Box 
              flexDirection="row" 
              alignHorizontal="left" 
              alignVertical="center"
            >
              <Text color="grey" weight="400" align="left" size="16">
                Tip minimum:
              </Text>
              <Spacer size="28" />
              <Text color="white" align="right" size="16">
                {tipMinimum.toLocaleString()} ✨
              </Text>
              <Spacer size="6" />
              <Icon name="info" color="white" size="12" />
            </Box>

            <Box 
              flexDirection="row" 
              alignHorizontal="left" 
              alignVertical="center"
            >
              <Text color="grey" weight="400" align="left" size="16">
                Eligible tippers:
              </Text>
              <Spacer size="14" />
              <Text color="white" align="right" size="16">
                {allowances.toLocaleString()}
              </Text>
              <Spacer size="6" />
              <Icon name="info" color="white" size="12" />
            </Box>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="18"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
            {currentCycleDate} CYCLE
          </Text>
        </Box>

        <Box 
          borderStyle="solid"
          borderWidth="1"
          borderRadius="8"
          padding="18"
          paddingLeft="24"
          borderColor="lightGrey"
          height="128"
          width="100%"
        >
          <Box grow flexDirection="row" gap="2">
            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="600" align="left" size="16">
                    Allowance
                  </Text>
                  <Spacer size="10" />
                  {allowance <= 0 ? (
                  <Text color="white" weight="600" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" weight="600" align="right" size="16">
                    {allowance.toLocaleString()} ✨
                  </Text>
                  )}
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="left" size="16">
                    Given
                  </Text>
                  <Spacer size="48" />
                  {current_amount_given <= 0 ? (
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {current_amount_given.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {current_amount_given <= 0 ? (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    ({current_total_given} tips)
                  </Text>
                  )}
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="left" size="16">
                    Remaining
                  </Text>
                  <Spacer size="14" />
                  {remaining_allowance <= 0 ? (
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {remaining_allowance.toLocaleString()} ✨
                  </Text>
                  )}
                </Box>
              </Box>
            </Box>

            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="600" align="right" size="16">
                    Received
                  </Text>
                  <Spacer size="10" />
                  {currect_amount_received <= 0 ? (
                  <Text color="white" weight="600" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" weight="600" align="right" size="16">
                    {currect_amount_received.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {currect_total_received <= 0 ? (
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    ({currect_total_received} tips)
                  </Text>
                  )}
                </Box>

                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  <Text color="grey" weight="400" align="right" size="16">
                    Rank
                  </Text>
                  <Spacer size="44" />
                  {user_rank <= 0 ? (
                  <Text color="white" align="right" size="16">
                    0 🏁
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {user_rank} 🏁
                  </Text>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Spacer size="16" />

        <Box 
          alignHorizontal="left"
          alignVertical="center"
          paddingLeft="0"
          height="18"
          width="100%"
        >
          <Text color="lightGrey" weight="400" align="left" size="14">
            TOTALS
          </Text>
        </Box>

        <Box 
          borderStyle="solid"
          borderWidth="1"
          borderRadius="8"
          padding="20"
          paddingLeft="24"
          borderColor="lightGrey"
          height="96"
          width="100%"
        >
          <Box grow flexDirection="row" gap="2">
            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Text color="grey" weight="600" align="left" size="16">
                  Given
                </Text>
                <Spacer size="10" />
                <Box 
                  flexDirection="row" 
                  alignHorizontal="left" 
                  alignVertical="center"
                >
                  {amount_given <= 0 ? (
                  <Text color="white" weight="600" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" weight="600" align="right" size="16">
                    {amount_given.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {total_given <= 0 ? (
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                    <Text color="lightGrey" weight="600" align="right" size="16">
                    ({total_given.toLocaleString()} tips)
                  </Text>
                  )}
                </Box>
              </Box>
            </Box>

            <Box flex="2">
              <Box 
                flexDirection="column" 
                alignHorizontal="left" 
                alignVertical="center"
              >
                <Text color="grey" weight="600" align="left" size="16">
                  Received
                </Text>
                <Spacer size="10" />
                <Box 
                  flexDirection="row" 
                  alignHorizontal="right" 
                  alignVertical="center"
                >
                  {amount_received <= 0 ? (
                  <Text color="white" weight="600" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" weight="600" align="right" size="16">
                    {amount_received.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {total_received <= 0 ? (
                  <Text color="lightGrey" weight="600" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                    <Text color="lightGrey" weight="600" align="right" size="16">
                    ({total_received.toLocaleString()} tips)
                  </Text>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    ),
  })
})


// Uncomment for local server testing
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
