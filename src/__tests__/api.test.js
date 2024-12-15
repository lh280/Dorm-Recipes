/**
 * @jest-environment node
 *
 * Use Node environment for server-side tests to avoid loading browser libraries.
 * This needs to be the top comment in the file
 */
/* eslint-disable no-return-assign, no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { testApiHandler } from "next-test-api-route-handler";
// eslint-disable-next-line import/no-extraneous-dependencies
import { getServerSession } from "next-auth";
import recipesEndpoint from "../pages/api/recipes/index";
import recipeEndpoint from "../pages/api/recipes/[id]";
import reviewsEndpoint from "../pages/api/reviews/index";
import reviewEndpoint from "../pages/api/reviews/[id]";
import userEndpoint from "../pages/api/users/[id]";
import userData from "../../db/seeds/usersSeed.json";
import recipeData from "../../db/seeds/recipeSeed.json";
import reviewData from "../../db/seeds/reviewSeed.json";
import { knex } from "../../db/knex";

jest.mock("next-auth/next");

// increase timeout limit to 20 seconds
jest.setTimeout(20000);

describe("DormRecipes API", () => {
  beforeAll(() =>
    // Ensure test database is initialized before an tests
    knex.migrate.rollback().then(() => knex.migrate.latest()),
  );

  afterAll(() =>
    // Ensure database connection is cleaned up after all tests
    knex.destroy(),
  );

  beforeEach(() => {
    // Mock nex-auth getServerSession with id of test user
    getServerSession.mockResolvedValue({
      user: {
        id: 1,
      },
    });
    // Reset contents of the test database
    return knex.seed.run();
  });

  afterEach(() => {
    getServerSession.mockReset();
  });

  test("GET /api/recipes/[id] should return a specific recipe", async () => {
    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: recipeEndpoint,
      params: { id: 2 }, // Testing dynamic routes requires params or patcher
      test: async ({ fetch }) => {
        const res = await fetch();
        // Inserted id start at 1, so id of 2 corresponds to data[1]
        await expect(res.json()).resolves.toMatchObject({
        ...recipeData[2],
        created_at: expect.any(String),
        updated_at: expect.any(String)
      });
      },
    });
  });

  test("GET /api/recipes/[id] should reject invalid id", async () => {
    await testApiHandler({
      rejectOnHandlerError: false, // We want to assert on the error
      pagesHandler: recipeEndpoint,
      params: { id: 400 },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.ok).toBe(false);
      },
    });
  });

  test("GET /api/reviews/[id] should return a specific review", async () => {
    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: reviewEndpoint,
      params: { id: 2 }, // Testing dynamic routes requires params or patcher
      test: async ({ fetch }) => {
        const res = await fetch();
        // Inserted id start at 1, so id of 2 corresponds to data[1]
        await expect(res.json()).resolves.toMatchObject({
        ...reviewData[1],
        created_at: expect.any(String),
        updated_at: expect.any(String)});
      },
    });
  });

  test("GET /api/reviews/[id] should reject invalid id", async () => {
    await testApiHandler({
      rejectOnHandlerError: false, // We want to assert on the error
      pagesHandler: reviewEndpoint,
      params: { id: 400 },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.ok).toBe(false);
      },
    });
  });

  test("GET /api/users/[id] should return a specific user", async () => {
    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: userEndpoint,
      params: { id: 1 }, // Testing dynamic routes requires params or patcher
      test: async ({ fetch }) => {
        const res = await fetch();
        // Inserted id start at 1, so id of 2 corresponds to data[1]
        await expect(res.json()).resolves.toMatchObject({
        ...userData[1],
        created_at: expect.any(String)
      });
      },
    });
  });

  test("GET /api/users/[id] should reject invalid id", async () => {
    await testApiHandler({
      rejectOnHandlerError: false, // We want to assert on the error
      pagesHandler: userEndpoint,
      params: { id: 400 },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.ok).toBe(false);
      },
    });
});
test("GET /api/user/[id] should return a specific user", async () => {
    await testApiHandler({
      rejectOnHandlerError: true,
      pagesHandler: userEndpoint,
      params: { id: 1 }, // Testing dynamic routes requires params or patcher
      test: async ({ fetch }) => {
        const res = await fetch();
        // Inserted id start at 1, so id of 2 corresponds to data[1]
        await expect(res.json()).resolves.toMatchObject({
            ...userData[1],
        created_at: expect.any(String)
      });
      },
    });
  });

  test("GET /api/users/[id] should reject invalid user", async () => {
    await testApiHandler({
      rejectOnHandlerError: false, // We want to assert on the error
      pagesHandler: userEndpoint,
      params: { id: 400 },
      test: async ({ fetch }) => {
        const res = await fetch();
        expect(res.ok).toBe(false);
      },
    });
  });

  describe("POST /api/recipes operations", () => {
    test("Should create a new recipe", async () => {
      const newRecipe = {
        "id": 1,
        "title": "Easy Cottage Cheese Snack",
        "description": "A perfect balance of creamy and crunchy for a quick yet satisfying snack.",
        "instructions": "Put cottage cheese into an appropriately sized container.\n Put the cucumber on top.\n Put the chickpeas on top of that.\n [optional] Put a top on it and shake.",
        "prep_time": 1,
        "servings": 1,
        "created_at": "2024-12-15T18:50:13.867Z",
        "updated_at": "2024-12-15T18:50:13.867Z"
    };

      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: recipesEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify(newRecipe),
          });
          const resRecipe = await res.json();
          expect(resRecipe).toMatchObject({
            ...newRecipe,
            id: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String)
          });
          const recipeIds = recipeData.map((recipe) => recipe.recipe_id);
          expect(
            recipeIds.map((recipe) => recipe.recipe_id).includes(resRecipe.recipe_id),
          ).toBe(false); // id should be unique
        },
      });
    });

    test("Should reject an recipe with no title", async () => {
      await testApiHandler({
        rejectOnHandlerError: false, // We want to assert on the error
        pagesHandler: recipesEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                "id": 1,
                "description": "A perfect balance of creamy and crunchy for a quick yet satisfying snack.",
                "instructions": "Put cottage cheese into an appropriately sized container.\n Put the cucumber on top.\n Put the chickpeas on top of that.\n [optional] Put a top on it and shake.",
                "prep_time": 1,
                "servings": 1,
                "created_at": "22 Jan 2024 00:00:00 GMT",
                "updated_at": "23 Jan 2024 00:00:00 GMT"
            }),
          });
          expect(res.ok).toBe(false);
        },
      });
    });

    describe("PUT /api/recipes/[id] operations", () => {
    
      test("Should reject recipe when id is different than URL", async () => {
        const newRecipe = { id: 1, ...recipeData[0], title: "Test recipe" };
        await testApiHandler({
          rejectOnHandlerError: false, // We want to assert on the error
          pagesHandler: recipeEndpoint,
          params: { id: newRecipe.id + 1 },
          test: async ({ fetch }) => {
            const res = await fetch({
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newRecipe),
            });
            expect(res.ok).toBe(false);
          },
        });
      });

      test("Should reject recipe with missing id", async () => {
        const { id, ...newRecipe } = { id: 1, ...recipeData[0], title: "New title" };
        await testApiHandler({
          rejectOnHandlerError: false, // We want to assert on the error
          pagesHandler: recipeEndpoint,
          params: { id },
          test: async ({ fetch }) => {
            const res = await fetch({
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newRecipe),
            });
            expect(res.ok).toBe(false);
          },
        });
      });
    });
  });

  describe("Unauthenticated recipe edits are rejected", () => {
    beforeEach(() => {
      getServerSession.mockResolvedValue(undefined);
    });

    test("Unauthenticated POST", async () => {
      const newRecipe = {
        "id": 501, // this user doesn't exist?
        "title": "Test recipe",
        "description": "This is a test",
        "instructions": "Step 1.\n Step 2.\n Step 3.",
        "prep_time": 1,
        "servings": 1,
        "created_at": "10 Dec 2024 00:00:00 GMT",
        "updated_at": "13 Dec 2024 00:00:00 GMT"
    };
      await testApiHandler({
        rejectOnHandlerError: false, // We want to assert on the error
        pagesHandler: recipesEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newRecipe),
          });
          expect(res.ok).toBe(false);
          expect(res.status).toBe(403);
        },
      });
    });

    // TODO : change to review
     test("Unauthenticated PUT", async () => {
       const newRecipe = { id: 1, ...recipeData[0], title: "New title" }; // Article at index 0 has id 1
       await testApiHandler({
         rejectOnHandlerError: false, // We want to assert on the error
         pagesHandler: recipesEndpoint,
         params: { id: newRecipe.id },
         test: async ({ fetch }) => {
           const res = await fetch({
             method: "PUT",
             headers: {
               "content-type": "application/json",
             },
             body: JSON.stringify(newRecipe),
           });
           expect(res.ok).toBe(false);
           expect(res.status).toBe(404);
         },
       });
     });
  });

  test("Unauthenticated DELETE: recipe", async () => {
    const newRecipe = { id: 1, ...recipeData[0], title: "New title" }; // Article at index 0 has id 1
    await testApiHandler({
      rejectOnHandlerError: false, // We want to assert on the error
      pagesHandler: recipesEndpoint,
      params: { id: newRecipe.id },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newRecipe),
        });
        expect(res.ok).toBe(false);
        expect(res.status).toBe(404);
      },
    });
  });

  describe("POST /api/reviews operations", () => {
    test("Should create a new review", async () => {
      const newReview = {
        "recipe_id": 5,
        "id": 1,
        "rating": 6,
        "content": "Questionable. Didn't love it.",
        "created_at": "6 Feb 2024 06:00:00 GMT",
        "updated_at": "7 Feb 2024 01:10:00 GMT"
    };

      await testApiHandler({
        rejectOnHandlerError: true,
        pagesHandler: reviewsEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json", // Must use correct content type
            },
            body: JSON.stringify(newReview),
          });
          const resReview = await res.json();
          expect(resReview).toMatchObject({
            ...newReview,
            id: expect.any(Number),
            created_at: expect.any(String),
            updated_at: expect.any(String)
          });
          const reviewIds = reviewData.map((review) => review.review_id);
          expect(
            reviewIds.map((review) => review.review_id).includes(resReview.review_id),
          ).toBe(false); // id should be unique
        },
      });
    });

    test("Should reject an review with no content", async () => {
      await testApiHandler({
        rejectOnHandlerError: false,
        pagesHandler: reviewsEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
                "recipe_id": 5,
                "id": 1,
                "rating": 6,
                "created_at": "6 Feb 2024 06:00:00 GMT",
                "updated_at": "7 Feb 2024 01:10:00 GMT"
            }),
          });
          expect(res.ok).toBe(false);
        },
      });
    });

    describe("PUT /api/reviews/[id] operations", () => {
        test("Should reject review with missing id", async () => {
          const { id, ...newReview } = { id: 1, ...reviewData[0], contents: "New review" };
          await testApiHandler({
            rejectOnHandlerError: false, // We want to assert on the error
            pagesHandler: reviewEndpoint,
            params: { id },
            test: async ({ fetch }) => {
              const res = await fetch({
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newReview),
              });
              expect(res.ok).toBe(false);
            },
          });
        });
  
        test("Should reject reviews with duplicate title", async () => {
          const newReview = { id: 1, ...reviewData[0], title: reviewData[1].title };
          await testApiHandler({
            rejectOnHandlerError: false, // We want to assert on the error
            pagesHandler: reviewEndpoint,
            params: { id: newReview.id },
            test: async ({ fetch }) => {
              const res = await fetch({
                method: "PUT",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(newReview),
              });
              expect(res.ok).toBe(false);
            },
          });
        });
    });
});

describe("Unauthenticated review edits are rejected", () => {
    beforeEach(() => {
      getServerSession.mockResolvedValue(undefined);
    });

    test("Unauthenticated POST", async () => {
      const newReview = {
        "recipe_id": 2,
        "id": 501,
        "rating": 4,
        "content": "BLAND! While this is a decent pasta recipe, it totally lacks flavor. Would make again in a pinch, but its definitely needs some doctoring.",
        "created_at": "1 Feb 2024 03:00:00 GMT",
        "updated_at": "3 Feb 2024 12:00:00 GMT"
    };
      await testApiHandler({
        rejectOnHandlerError: false, // We want to assert on the error
        pagesHandler: reviewsEndpoint,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newReview),
          });
          expect(res.ok).toBe(false);
          expect(res.status).toBe(500);
        },
      });
    });
     
  });

  test("Unauthenticated DELETE: review", async () => {
    const newReview = { id: 1, ...reviewData[0], contents: "New review" };
    await testApiHandler({
      rejectOnHandlerError: false,
      pagesHandler: reviewsEndpoint,
      params: { id: newReview.id },
      test: async ({ fetch }) => {
        const res = await fetch({
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
        expect(res.ok).toBe(false);
        expect(res.status).toBe(400);
      },
    });
  });
});