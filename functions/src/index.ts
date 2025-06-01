import * as functions from "firebase-functions";
import admin from "firebase-admin";

admin.initializeApp();

// const db = admin.firestore();
// const postsCollection = db.collection("posts");

// Example function: Hello World
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Add a new post
// export const addPost = functions.https.onCall(async (data, context) => {
//   try {
//     const { title, content, author, imageUrl, tags, published } = data;

//     // Add post to Firestore
//     const postRef = await postsCollection.add({
//       title,
//       content,
//       author,
//       imageUrl: imageUrl || null,
//       tags: tags || [],
//       published: published || false,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return { id: postRef.id };
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// Get a post by ID
// export const getPostById = functions.https.onCall(async (data, context) => {
//   try {
//     const { id } = data;
//     const postDoc = await postsCollection.doc(id).get();

//     if (!postDoc.exists) {
//       throw new functions.https.HttpsError("not-found", "Post not found");
//     }

//     return { id: postDoc.id, ...postDoc.data() };
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// Update a post by ID
// export const updatePost = functions.https.onCall(async (data, context) => {
//   try {
//     const { id, title, content, author, imageUrl, tags, published } = data;

//     await postsCollection.doc(id).update({
//       title,
//       content,
//       author,
//       imageUrl,
//       tags,
//       published,
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });

//     return { message: "Post updated successfully" };
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// Delete a post by ID
// export const deletePost = functions.https.onCall(async (data, context) => {
//   try {
//     const { id } = data;

//     await postsCollection.doc(id).delete();
//     return { message: "Post deleted successfully" };
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });

// List all posts
// export const listPosts = functions.https.onCall(async (data, context) => {
//   try {
//     const snapshot = await postsCollection.get();
//     const posts = snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));

//     return { posts };
//   } catch (error) {
//     throw new functions.https.HttpsError("internal", error.message);
//   }
// });
