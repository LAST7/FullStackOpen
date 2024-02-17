import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blogs from "./Blogs";

test("renders content", () => {
    const blog = [
        {
            id: "1",
            title: "test title",
            author: "test last",
            url: "www.test.com",
            likes: 42,
        },
    ];

    const { container } = render(<Blogs blogs={blog} />);

    // const elem = screen.getByText("test title");
    // expect(elem).toBeDefined();
    const div = container.querySelector(".blog");
    // screen.debug(div);
    expect(div).toHaveTextContent("test title");
});

test("clicking the button calls event handler once", async () => {
    const blog = [
        {
            id: "1",
            title: "test title",
            author: "test last",
            url: "www.test.com",
            likes: 42,
        },
    ];

    render(
        <Blogs blogs={blog} />
    )
});
