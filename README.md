# Product Insights

Product Insights is a Next.js web application that visualizes product sales data and trends for jewelry products. It provides interactive dashboards and insights based on real-world sales and engagement metrics.

## Features

- Interactive dashboards for product sales breakdowns
- Visualizations of trends, leakage points, and actionable insights
- Data-driven tabs and stages for detailed analysis
- Responsive UI built with Next.js and modern CSS

## Project Structure

```
├── public/
│   ├── data/
│   │   └── product-insights.json   # Main data source for insights and breakdowns
│   └── images/                     # Static images and icons
├── src/
│   ├── app/
│   │   ├── components/             # React components
│   │   ├── lib/                    # Utility libraries
│   │   └── types/                  # TypeScript types
├── .next/                          # Next.js build output
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/product-insights.git
    cd product-insights
    ```

2. Install dependencies:
    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Building for Production

```sh
npm run build
npm start
```

## Data Source

The main data for insights and sales breakdowns is located in [public/data/product-insights.json](public/data/product-insights.json).

## License

MIT

---

Feel free to customize this README further to match your project’s specifics!