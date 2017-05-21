package net.hr.in2.hgss.hgss.mainScreen.listAction;

import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.extra.Utils;
import net.hr.in2.hgss.hgss.mainScreen.MainActivity;
import net.hr.in2.hgss.hgss.model.Action;

import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ActionFragment extends Fragment {

    List<Action> actions;

    RecyclerView recyclerView;

    ProgressDialog progressDialog;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        progressDialog = new ProgressDialog(getActivity());
        progressDialog.setIndeterminate(true);
        progressDialog.setMessage(getActivity().getString(R.string.loading_pg));
        progressDialog.show();

        Call<List<Action>> call = Utils.getRestApi().getActions();
        call.enqueue(new Callback<List<Action>>() {
            @Override
            public void onResponse(Call<List<Action>> call, Response<List<Action>> response) {
                progressDialog.hide();

                if (response.body() != null) {
                    actions = response.body();
                    setData();
                } else {
                    Toast.makeText(getActivity(), getActivity().getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
                }
            }

            @Override
            public void onFailure(Call<List<Action>> call, Throwable t) {
                progressDialog.hide();
                Toast.makeText(getActivity(), getActivity().getResources().getString(R.string.error), Toast.LENGTH_LONG).show();
            }
        });
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_action_list, container, false);

        ((MainActivity) getActivity()).getSupportActionBar().setTitle("Lista Akcija");

        if (view instanceof RecyclerView) {
            Context context = view.getContext();
            recyclerView = (RecyclerView) view;
            recyclerView.setLayoutManager(new LinearLayoutManager(context));
        }
        return view;
    }

    private void setData() {
        recyclerView.setAdapter(new MyActionRecyclerViewAdapter(actions));
    }
}
