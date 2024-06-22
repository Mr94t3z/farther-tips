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
  return c.res({
    title: 'Farther Tips Allowance ✨',
    image: `/check/${fid}`,
    intents: [
      <Button action={`/farther-tips-action/${fid}`}> Refresh </Button>,
      <Button  action='/check-by-me'> Check mine </Button>,
      <Button.Link href='https://warpcast.com/0x94t3z.eth/0x89b3f1cc'> ✨ Tip </Button.Link>
    ],
  })
})


app.frame('/check-by-me/', async (c) => {
  const { fid } = c.var.interactor || {}
  return c.res({
    title: 'Farther Tips Allowance ✨',
    image: `/check/${fid}`,
    intents: [
      <Button action='/check-by-me'> Refresh </Button>,
      <Button action='/check-by-me'> Check mine </Button>,
      <Button.Link href='https://warpcast.com/0x94t3z.eth/0x89b3f1cc'> ✨ Tip </Button.Link>
    ],
  })
})


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
          padding="14"
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
                  <Text color="white" align="right" size="16">
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
                    (tips)
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

            <Box flex="1">
              <Box 
                flexDirection="column" 
                alignHorizontal="right" 
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
                  <Text color="white" align="right" size="16">
                    150 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (1 tips)
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
          padding="16"
          paddingLeft="24"
          borderColor="lightGrey"
          height="60"
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
                    Given
                  </Text>
                  <Spacer size="10" />
                  <Text color="white" align="right" size="16">
                    9,600 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (11 tips)
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box flex="1">
              <Box 
                flexDirection="column" 
                alignHorizontal="right" 
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
                  <Text color="white" align="right" size="16">
                    14,762.08 ✨
                  </Text>
                  <Spacer size="6" />
                  <Text color="lightGrey" weight="400" align="right" size="16">
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
  // Extract fid from the request
  const { fid } = c.req.param();

  // Make the API request to fetch public tips meta
  const responseMeta = await fetch('https://farther.social/api/v1/public.tips.meta');

  // Check if the response is OK (status code 200-299)
  if (!responseMeta.ok) {
    throw new Error(`HTTP error! Status: ${responseMeta.status}`);
  }

  // Parse the JSON response
  const meta = await responseMeta.json();

   // Extract the specific fields from the data
   const { tipMinimum, updatedAt, _count: { allowances } } = meta.result.data[0];

  // Format updatedAt date
  const updatedDate = new Date(updatedAt);

  // Format the date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric', month: 'short', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hour12: true
  };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(updatedDate);

  // Make the API request to fetch user by fid
  const params = { fid: fid };
  const encodedParams = encodeURIComponent(JSON.stringify(params));
  const apiUrl = `https://farther.social/api/v1/public.user.byFid?input=${encodedParams}`;
  const responseUser = await fetch(apiUrl);

  // Check if the response is OK (status code 200-299)
  if (!responseUser.ok) {
    throw new Error(`HTTP error! Status: ${responseUser.status}`);
  }

  // Parse the JSON response
  const userData = await responseUser.json();

  // Extract displayName and pfpUrl
  const { displayName, pfpUrl } = userData.result.data;

  // Extract tips and currentCycle data
  const { totals, currentCycle } = userData.result.data.tips;

  // Prepare cycle date information
  let currentCycleDate = null;
  if (currentCycle && currentCycle.startTime) {
    const startTime = new Date(currentCycle.startTime);
    const month = startTime.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const day = startTime.getDate();
    currentCycleDate = `${month} ${day}`;
  }

  // Prepare null cycle date information from updatedAt if currentCycle is null
  let nullCycleDate = formattedDate;
  if (!currentCycle || !currentCycle.startTime) {
    const nullStartDate = new Date(updatedDate);
    const nullMonth = nullStartDate.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    const nullDay = nullStartDate.getDate();
    nullCycleDate = `${nullMonth} ${nullDay}`;
  }

  // Extract totals and currentCycle values
  
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
                  borderRadius="48"
                  src={pfpUrl}
                />
                <Spacer size="10" />
                <Text color="yellow" weight="600" align="center" size="16">
                  {displayName}
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
            {currentCycleDate ? `${currentCycleDate} CYCLE` : `${nullCycleDate} CYCLE`}
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
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
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

            <Box flex="1">
              <Box 
                flexDirection="column" 
                alignHorizontal="right" 
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
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {currect_amount_received.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {currect_total_received <= 0 ? (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    ({currect_total_received} tips)
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
          height="60"
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
                    Given
                  </Text>
                  <Spacer size="10" />
                  {amount_given <= 0 ? (
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {amount_given.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {total_given <= 0 ? (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                    <Text color="lightGrey" weight="400" align="right" size="16">
                    ({total_given.toLocaleString()} tips)
                  </Text>
                  )}
                </Box>
              </Box>
            </Box>

            <Box flex="1">
              <Box 
                flexDirection="column" 
                alignHorizontal="right" 
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
                  {amount_received <= 0 ? (
                  <Text color="white" align="right" size="16">
                    0 ✨
                  </Text>
                  ) : (
                  <Text color="white" align="right" size="16">
                    {amount_received.toLocaleString()} ✨
                  </Text>
                  )}
                  <Spacer size="6" />
                  {total_received <= 0 ? (
                  <Text color="lightGrey" weight="400" align="right" size="16">
                    (0 tips)
                  </Text>
                  ) : (
                    <Text color="lightGrey" weight="400" align="right" size="16">
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
