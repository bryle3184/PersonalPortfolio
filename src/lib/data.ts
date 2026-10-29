import type { PortfolioData } from "../types";
import raw from "../data/portfolio.json";

const data = raw as unknown as PortfolioData;

export default data;