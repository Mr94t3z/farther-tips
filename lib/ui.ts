import { createSystem } from "frog/ui";

export const { Box, Columns, Column, Divider, Icon, Image, Heading, Text, VStack, Spacer, vars } = createSystem({
  colors: {
    bg: "rgb(40,84,153)",
    yellow: "rgb(251,210,76)",
    white: "white",
    lightGrey: "rgba(255, 255, 255, 0.3)",
    grey: "rgba(255, 255, 255, 0.5)"
  },
  fonts: {
    default: [
      {
        name: 'Inter',
        source: 'google',
        weight: 400,
      },
      {
        name: 'Inter',
        source: 'google',
        weight: 600,
      },
    ],
  },
});