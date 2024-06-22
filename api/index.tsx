import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import { 
  Box, 
  Column, 
  Divider,
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
})


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
    // const castId = JSON.stringify(c.actionData.castId);

    // Parse the message back to an object to extract fid
    // const parsedCastId = JSON.parse(castId);
    // const fid = parsedCastId.fid;
    // const hash = parsedCastId.hash;

    return c.frame({ path: '/farther-tips-action'})
  }, 
  { name: "Farther Tips ✨", icon: "moon", description: "A Farcaster Cast Action to check Farther Tip Allowance.", aboutUrl: 'https://farther.social/tips'}
)


app.frame('/farther-tips-action', async (c) => {
  return c.res({
    title: 'Farther Tips Allowance ✨',
    image: '/tips',
    intents: [
      <Button action='/farther-tips-action'> Refresh </Button>,
      <Button action='/farther-tips-action'> Check mine </Button>,
      <Button.Link href='https://farther.social/tips'> ✨ Tip </Button.Link>
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
            <Column 
              width="2/4" 
              padding="12" 
              paddingLeft="0" 
              flexDirection="row" 
              alignHorizontal="left"
            >
              <Divider direction="vertical" color="yellow" />
              <Divider direction="vertical" color="yellow" />
              <Spacer size="10" />
              <Text color="white" weight="600" align="center" size="32">
                Farther Tips
              </Text>
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


// Uncomment for local server testing
// devtools(app, { serveStatic });

export const GET = handle(app)
export const POST = handle(app)
